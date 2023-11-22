import { defer, json } from "@remix-run/node";
import { Await, useLoaderData, useNavigation } from "@remix-run/react";
import { Suspense } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getProducts } from "~/services/product.server";
import style from "../style.module.css";





export const loader = async () => {
  const products = await getProducts();
  return defer({ products });
};

function Home() {
  const navigation = useNavigation();

  const { products } = useLoaderData<typeof loader>();
  return (
    <div className={navigation.state === "loading" ? style.loading : ""}>
      <Suspense>
        <Await resolve={products}>
          {(products) => <ProductsList products={products.products} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default Home;
