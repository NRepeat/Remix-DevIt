import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { z } from "zod";
import Product from "~/components/Store/Product/Product";
import ProductsLike from "~/components/Store/ProductsLike/ProductsLike";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { customerAuthenticator } from "~/services/auth.server";
import { createCart, getCartByCustomerId } from "~/services/cart.server";
import { createCartItem } from "~/services/cartItem.server";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { NotFoundError } from "~/services/error.server";
import { getProduct, getProductsByCategory } from "~/services/product.server";
import {
  CustomResponse,
  NotFoundSingleProductPage,
} from "~/services/responseError.server";
import { commitSession, getSession } from "~/services/session.server";
import styles from "./styles.module.css";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    invariant(params.slug, "Missing slug param");
    const slug = params.slug;
    const product = await getProduct({ slug });
    const productsByCategory = await getProductsByCategory({
      category: product.category.slug,
    });
    const session = await getSession(request.headers.get("Cookie"));
    const cart = createSessionCart(session);

    return json({
      productsByCategory,
      product,
      cart: cart.items()[product.id],
    });
  } catch (error) {
    const slug = params.slug;
    throw new NotFoundSingleProductPage(`Product:"${slug}" not found`);
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const slug = formData.get("slug");
    if (!slug) {
      throw new NotFoundError({ message: "Product slug not found" });
    }

    const product = await getProduct({ slug: z.coerce.string().parse(slug) });
    if (!product || !product.externalId) {
      throw new NotFoundError({
        message: `Product ${product.title} not found`,
      });
    }

    const session = await getSession(request.headers.get("Cookie"));
    const sessionCart = createSessionCart(session);
    const customer = await customerAuthenticator.isAuthenticated(request);

    const addToCart = async (cartId: number) => {
      const promises = sessionCart.items().map(async (item) => {
        await createCartItem({
          cartId,
          externalId: z.coerce.number().parse(item.productId),
          quantity: item.quantity,
        });
      });
      await Promise.all(promises);
    };

    if (customer) {
      sessionCart.addProduct(product.externalId);
      const cart = await getCartByCustomerId(customer.id);
      const cartId = cart ? cart.id : (await createCart(customer.id)).id;
      await addToCart(cartId);
    } else {
      sessionCart.addProduct(product.externalId);
      const cartId = (await createCart()).id;
      await addToCart(cartId);
    }

    return json(
      { success: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new CustomResponse(
        { success: false, error: error.message },
        { status: 404, statusText: error.message }
      );
    }
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [];
  }
  return [
    {
      title: data.product.title,
    },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <p className={styles.error}>
          {error.statusText} {error.status}
        </p>
        <Breadcrumbs />
        <ProductsLike />
      </>
    );
  }
}

function ProductRoute() {
  const data = useLoaderData<typeof loader>();
  const breadcrumbs = [
    { label: "Home", link: "/" },
    {
      label: `${data.product.category.slug}`,
      link: `/categories/${data.product.category.slug}`,
    },
    { label: `${data.product.title}`, link: "" },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Product data={data} />
      <ProductsLike data={data.productsByCategory} />
    </>
  );
}

export default ProductRoute;
