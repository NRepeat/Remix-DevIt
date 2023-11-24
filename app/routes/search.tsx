import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SortedProductsList from "~/components/Header/Sort/Sort";
import ProductsList from "~/components/ProductsList/ProductsList";
import { searchProduct } from "~/services/product.server";


export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery= url.searchParams.get("search");
  const searchData = await searchProduct(searchQuery);
  const sortQuery = url.searchParams.get("sort");
  const sortType = sortQuery !== null ? sortQuery : "asc";
  
  return json({ searchData ,sortType});
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <SortedProductsList
    ProductsList={ProductsList}
    order={data.sortType}
    products={data.searchData.products}
  />
  );
}
