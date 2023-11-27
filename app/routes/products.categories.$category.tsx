import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import SortedProductsList from "~/components/Sort/Sort";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getProductsByCategory } from "~/services/product.server";


export async function loader({params,request}:LoaderFunctionArgs) {
  const url = new URL(request.url);
  invariant(params.category, "Missing contactId param");
  const products = await getProductsByCategory(params.category);
  const sortQuery = url.searchParams.get("sort");
  const sortType = sortQuery !== null ? sortQuery : "asc";
  
  return json({products,sortType})
}

export default function () {
const data  = useLoaderData<typeof loader>()
  return (
    <SortedProductsList
    ProductsList={ProductsList}
    order={data.sortType}
    products={data.products.products}
  />
  );
}