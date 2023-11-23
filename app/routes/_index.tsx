import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getProducts } from "~/services/product.server";
import Filter from "~/components/Sort/Sort";

export const loader = async () => {
  const products = await getProducts();
  return defer({ products });
};

function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <Suspense>
      <Await resolve={data}>
        {(data) => <ProductsList products={data.products.products} />}
      </Await>
    </Suspense>
  );
}

export default Home;
