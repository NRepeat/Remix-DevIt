import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import ProductsList from "~/components/ProductsList/ProductsList";
import categoryPage from "../styles/categoryPage.css";
import { getProductsByCategory } from "~/services/product.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: categoryPage },
];

export async function loader({ request, params }: LoaderFunctionArgs) {
  const category = params.category;
  const url = new URL(request.url);
  invariant(category, "Missing contactId param");
  const sort = url.searchParams.get("sort");
  const products = await getProductsByCategory(category, sort!);
  if (!products) {
    throw new Response("Page Not Found", { status: 404 });
  }
  return json({ products, category });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  const productsData = data.products;
  const breadcrumbs = [
    { label: "Home", link: "/products" },
    {
      label: `${data.category}`,
      link: `/products/category/${data.category}`,
    },
  ];
  return (
    <div className="categoryContainer">
      <Breadcrumbs breadcrumbs={breadcrumbs} admin={false} />
      <ProductsList productsData={productsData} />
    </div>
  );
}
