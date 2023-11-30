import { LinksFunction, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { searchProduct } from "~/services/product.server";
import searchPage from "../styles/searchPage.css";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: searchPage },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const sort = url.searchParams.get("sort");
  if (searchQuery === '') {
    return redirect('/products');
  }
  const products = await searchProduct(searchQuery!,sort!);
  
  return json({ products });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <div className="searchContainer"><ProductsList data={data} /></div>;
}
