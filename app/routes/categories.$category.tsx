import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CategoryPage from "~/Pages/CategoryPage/CategoryPage";
import {
  getAllProductCategories,
  getProductsByCategory,
} from "~/services/product.server";
import categoryPage from "~/styles/categoryPage.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: categoryPage },
];
export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sortType = url.searchParams.get("sort");
  const category = params.category;
  if (category) {
    const products = await getProductsByCategory(category, sortType);
    const categories = await getAllProductCategories();

    return json({ products, categories });
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <section className="container">
      <CategoryPage data={data} />;
    </section>
  );
}
