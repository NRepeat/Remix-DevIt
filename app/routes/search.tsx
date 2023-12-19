import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SearchPage from "~/Pages/SearchPage/SerachPage";
import {
  getAllProductCategories,
  searchProduct,
} from "~/services/product.server";
import categoryPage from "~/styles/categoryPage.css";
import { coerceNumber } from "~/utils/pagination.server";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: categoryPage },
];
export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const sortType = url.searchParams.get("sort");
  const page = url.searchParams.get("page");

  if (searchQuery) {
    const products = await searchProduct(
      searchQuery,
      coerceNumber.parse(page),
      sortType
    );
    const categories = await getAllProductCategories();

    return json({ products, categories, page: coerceNumber.parse(page) });
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <section className="container">
      <SearchPage data={data} />;
    </section>
  );
}
