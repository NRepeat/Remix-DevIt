import { LoaderFunction, json } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";
import ContactsList from "~/components/ContactsList/ContactsList";
import { getProducts } from "~/services/product.server";


export const loader: LoaderFunction =async () => {
  const products = await getProducts()
  return json({products})
}


function Home() {
const products = useLoaderData<typeof loader>()
  console.log("🚀 ~ file: _index.tsx:15 ~ Home ~ products:", products)
  return (
    <div>
    </div>
  );
}

export default Home;
