import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  useLoaderData,
} from "@remix-run/react";
import productIndexStylesHref from "../styles/productIndex.css";
import { getAllProductCategories, getLimitProducts } from "~/services/product.server";
import { getSession } from "~/services/session.server";
import { createCart } from "~/services/cart.server";
import ProductsListRoute from "~/pages/StorePage/StorePage";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: productIndexStylesHref},
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("page");
  const limit = 12;
  const par = "";
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const skip = (page - 1) * limit;
  const products = await getLimitProducts(limit, skip, par);
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  const categories = await getAllProductCategories();
  if (products.limit === 0) {
    throw new Response("Page Not Found", { status: 404 });
  }
  return json({ products, page, cart: cart.items(), categories });
};

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="container">

    <ProductsListRoute data={data} />

  </div>
  );
}