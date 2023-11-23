import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { searchProduct, searchProductByCategories } from "~/services/product.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const c = url.searchParams.get("c");
  const q = url.searchParams.get("q");

  const {products} = await searchProductByCategories(c);
  const {products:productq}= await searchProduct(q);
  console.log("🚀 ~ file: search.tsx:13 ~ loader ~ productq:", productq)

  return json([...products, ...productq]);
}

export default function  F () {
  const data = useLoaderData<typeof loader>();
  console.log("🚀 ~ file: search.tsx:19 ~ F ~ data:", data)
  return (
    <div>
      <ProductsList products={data} />
    </div>
  );
}
