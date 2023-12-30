import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StoreRouteError from "~/components/Errors/RouteError/StoreRouteError";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import { createCart } from "~/services/cartSession.server";
import {
  getAllProductCategories,
  getAllProducts,
} from "~/services/product.server";
import { ProductNotFoundError } from "~/services/productError.server";
import {
  InternalServerResponse,
  NotFoundResponse,
} from "~/services/responseError.server";
import { getSession } from "~/services/session.server";
import { parseAndValidateNumber } from "~/utils/validation.server";
import rootIndexStylesHref from "../../styles/rootIndex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootIndexStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const cart = createCart(session);
    const url = new URL(request.url);
    const pageQuery = url.searchParams.get("page");
    const sort = url.searchParams.get("sort");
    const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;
    const categories = await getAllProductCategories();
    const products = await getAllProducts({ page, sortName: sort });

    return json({
      products,
      page,
      cart: cart.items(),
      categories,
    });
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      throw new NotFoundResponse({ error });
    }
    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
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
      <p className="title">Latest drops</p>
      <Pagination
        admin={false}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
