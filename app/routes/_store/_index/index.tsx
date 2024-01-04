import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import StoreRouteError from "~/components/Errors/RouteError/StoreRouteError";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import { createCart } from "~/services/cartSession.server";
import { getResponseError } from "~/services/errorResponse.server";
import { UnauthorizedError } from "~/services/httpErrors.server";
import {
  getAllProductCategories,
  getAllProducts,
} from "~/services/product.server";
import { getSession } from "~/services/session.server";
import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session) {
      throw UnauthorizedError("Session not found or invalid");
    }

    const cart = createCart(session);
    const url = new URL(request.url);
    const pageQuery = url.searchParams.get("page");
    const sort = url.searchParams.get("sort");
    const page = pageQuery ? z.coerce.number().parse(pageQuery) : 1;
    const categories = await getAllProductCategories();
    const products = await getAllProducts({ page, sortName: sort });

    return json({
      products,
      page,
      cart: cart.items(),
      categories,
    });
  } catch (error) {
    getResponseError(error);
  }
};
export function ErrorBoundary() {
  return <StoreRouteError />;
}
export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <ProductsList productsData={data.products} />
      <p className={styles.title}>Latest drops</p>
      <Pagination
        admin={false}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
