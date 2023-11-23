import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/ProductsList/ProductsList";
import {
  searchProduct,
  searchProductByCategories,
} from "~/services/product.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const c = url.searchParams.get("c");
  const q = url.searchParams.get("q");

  const categoriesedData = await searchProductByCategories(c);
  const searchedData = await searchProduct(q);

  const { products: productc } = categoriesedData;
  const { products: productq } = searchedData;
  return json([...productc, ...productq]);
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <ProductsList products={data} />
    </div>
  );
}
