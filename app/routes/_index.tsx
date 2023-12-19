import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StorePage from "~/Pages/StorePage/StorePage";
import { createCart } from "~/services/cartSession.server";
import {
  getAllProductCategories,
  getAllProducts,
} from "~/services/product.server";
import { getSession } from "~/services/session.server";
import productIndexStylesHref from "../styles/productIndex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: productIndexStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const categories = await getAllProductCategories();
  const products = await getAllProducts(page, sort);
  return json({ products, page, cart: cart.items(), categories });
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="bg-pd-index">
      <StorePage data={data} />
    </div>
  );
}
