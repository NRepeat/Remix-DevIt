import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { searchProduct } from "~/services/product.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const products= await searchProduct(q);
  return json({ products });
};



export default function () {
  const  data = useLoaderData<typeof loader>();
  return (
    <div>
      <ProductsList products={data.products.products} />
    </div>
  );
}
