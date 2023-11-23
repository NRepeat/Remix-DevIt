import { defer} from "@remix-run/node";
import { Await, useLoaderData} from "@remix-run/react";
import { Suspense } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getProducts } from "~/services/product.server";





export const loader = async () => {
  const products = await getProducts();
  return defer({ products });
};

function Home() {

  const { products } = useLoaderData<typeof loader>();
  return (
      <Suspense>
        <Await resolve={products}>
          {(products) => <ProductsList products={products.products} />}
        </Await>
      </Suspense>
  );
}

export default Home;
