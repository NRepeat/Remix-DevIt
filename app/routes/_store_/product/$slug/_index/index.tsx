import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Product from "~/components/Store/Product/Product";
import ProductsLike from "~/components/Store/ProductsLike/ProductsLike";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { NotFound } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";
import { UnauthorizedError } from "~/services/httpErrors.server";
import { getProduct, getProductsByCategory } from "~/services/product.server";
import { getSession } from "~/services/session.server";
import styles from "./styles.module.css";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session) {
      throw UnauthorizedError("Session not found or invalid");
    }
    const cart = createSessionCart(session);
    const slug = params.slug;
    const product = await getProduct({ slug });
    if (!product) {
      throw new NotFound(`Product ${slug}`);
    }
    const productsByCategory = await getProductsByCategory({
      category: product.category.slug,
    });
    const cartItems = cart.items()[product.id];
    return json({
      productsByCategory,
      product,
      cart: cartItems,
    });
  } catch (error) {
    getResponseError(error);
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
