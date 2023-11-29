import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import productIndexStylesHref from "../styles/productIndex.css";
import { getSession } from "~/services/session.server";
import { createCart } from "~/services/cart.server";
import {getAllDbProductCategories, getAllProducts,} from "~/services/product.server";
import ProductsListRoute from "~/pages/StorePage/StorePage";
import { importDummyData } from "~/services/import.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: productIndexStylesHref },
];

let isImported = false;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!isImported) {
    await importDummyData();
    isImported = true;
  }
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const { products, totalPages} = await getAllProducts(page, sort!);
 
  const categories = await getAllDbProductCategories();
  if (!products) {
    throw new Response("Page Not Found", { status: 404 });
  }
  return json({ products,totalPages, page, cart: cart.items(), categories });
};

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="bg-pd-index">
      <ProductsListRoute data={data} />
    </div>
  );
}
