import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getProductsByCategory } from "~/services/product.server";
import categoryPage from "../styles/categoryPage.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: categoryPage },
];

export async function loader({ params }: LoaderFunctionArgs) {


  const category = params.category;

  invariant(category, "Missing contactId param");
  const products = await getProductsByCategory(category);
  if (products.total === 0) {
    throw new Response("Page Not Found", { status: 404 });
  }
  return json({ products, category });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  const breadcrumbs = [
    { label: "Home", link: "/products" },
    {
      label: `${data.category}`,
      link: `/products/category/${data.category}`,
    },
  ];
  return (
    <div className="categoryContainer">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <ProductsList data={data} />
    </div>
  );
}
