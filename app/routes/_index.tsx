import { LoaderFunction, MetaArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/Header/Header";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getProducts } from "~/services/product.server";





export const loader = async () => {
  const products = await getProducts();
  return json({ products });
};

function Home() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div>
      <Header/>
      <ProductsList products={products.products} />
    </div>
  );
}

export default Home;
