import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CategoryPage from "~/Pages/CategoryPage/CategoryPage";
import {
  getAllProductCategories,
  getProductsByCategory,
} from "~/services/product.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const category = params.category;
  if (category) {
    const products = await getProductsByCategory(category);
    const categories = await getAllProductCategories();

    return json({ products, categories });
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <CategoryPage data={data} />;
}
