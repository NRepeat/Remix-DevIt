import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import Sidebar from "~/components/Store/SideBar/SideBar";
import {
  getAllProductCategories,
  searchProduct,
} from "~/services/product.server";
import searchPage from "~/styles/searchPage.css";
import { parseAndValidateNumber } from "~/utils/validation.server";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: searchPage },
];
export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const sortType = url.searchParams.get("sort");
  const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;

  if (searchQuery === "" || !searchQuery) {
    return redirect("/");
  }
  const categories = await getAllProductCategories();
  const products = await searchProduct(
    parseAndValidateNumber(page),
    searchQuery,
    sortType
  );

  return json({ products, page: parseAndValidateNumber(page), categories });
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
