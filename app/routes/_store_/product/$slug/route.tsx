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
import { z } from "zod";
import Product from "~/components/Store/Product/Product";
import ProductsLike from "~/components/Store/ProductsLike/ProductsLike";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { customerAuthenticator } from "~/services/auth.server";
import { createCart, getCartByCustomerId } from "~/services/cart.server";
import { createCartItem } from "~/services/cartItem.server";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { NotFound } from "~/services/error.server";
import { getHTTPError } from "~/services/errorResponse.server";
import { UnauthorizedError } from "~/services/httpErrors.server";
import { getProduct, getProductsByCategory } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";
import styles from "./styles.module.css";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session) {
      throw new UnauthorizedError("Session not found or invalid");
    }
    const cart = createSessionCart(session);
    const slug = params.slug;
    const product = await getProduct({ slug });
    if (!product) {
      throw new NotFound({ message: `Product ${slug}`, code: 4000 });
    }
    const productsByCategory = await getProductsByCategory({
      category: product.category.slug,
    });

    return json({
      productsByCategory,
      product,
      cart: cart.items()[product.id],
    });
  } catch (error) {
    getHTTPError(error);
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session) {
      throw new UnauthorizedError("Session not found or invalid");
    }
    const sessionCart = createSessionCart(session);
    const formData = await request.formData();
    const slug = formData.get("slug");
    if (!slug) {
      throw new NotFound({ message: "Product slug not found", code: 4211 });
    }

    const product = await getProduct({ slug: z.coerce.string().parse(slug) });
    if (!product || !product.externalId) {
      throw new NotFound({ message: `Product ${slug}`, code: 4000 });
    }

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
    getHTTPError(error);
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
          {error.data} {error.status}
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
