import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import StoreRouteError from "~/components/Errors/RouteError/StoreRouteError";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import Sidebar from "~/components/Store/SideBar/SideBar";
import { getHTTPError } from "~/services/errorResponse.server";
import {
  getAllProductCategories,
  searchProduct,
} from "~/services/product.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search");
    const sortType = url.searchParams.get("sort");
    const pageQuery = url.searchParams.get("page");
    const page = pageQuery ? z.coerce.number().parse(pageQuery) : 1;
    if (searchQuery === "" || !searchQuery) {
      return redirect("/");
    }
    const categories = await getAllProductCategories();
    const products = await searchProduct({
      search: searchQuery,
      sortName: sortType,
    });

    return json({ products, page, categories });
  } catch (error) {
    getHTTPError(error);
  }
}
export function ErrorBoundary() {
  return <StoreRouteError />;
}
export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <p className="title">Search result</p>
      <ProductsList productsData={data.products} />
      <Sidebar links={data.categories} />
    </>
  );
}
