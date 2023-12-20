import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SearchPage from "~/Pages/SearchPage/SearchPage";
import {
  getAllProductCategories,
  searchProduct,
} from "~/services/product.server";
import categoryPage from "~/styles/categoryPage.css";
import { parseAndValidateNumber } from "~/utils/validation.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: categoryPage },
];
export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const sortType = url.searchParams.get("sort");
  const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;

  if (searchQuery === "" || !searchQuery) {
    return redirect("/");
  }

  const products = await searchProduct(
    parseAndValidateNumber(page),
    searchQuery,
    sortType
  );
  const categories = await getAllProductCategories();

  return json({ products, categories, page: parseAndValidateNumber(page) });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <section className="container">
      <SearchPage data={data} />;
    </section>
  );
}
