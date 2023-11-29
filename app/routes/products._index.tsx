import { LinksFunction, LoaderFunctionArgs, defer, json } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import productIndexStylesHref from "../styles/productIndex.css";
import { getSession } from "~/services/session.server";
import { createCart } from "~/services/cart.server";
import { getAllProductCategories, getAllProducts, } from "~/services/product.server";
import ProductsListRoute from "~/pages/StorePage/StorePage";
import { importDummyData } from "~/services/import.server";
import { Suspense } from "react";

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
  const { products, totalPages } = await getAllProducts(page, sort!);
  if (!products) {
    throw new Response("Page Not Found", { status: 404 });
  }
  const categories = await getAllProductCategories();
 
  return defer({ products, totalPages, page, cart: cart.items(), categories });
};

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="bg-pd-index">
      <Suspense>
        <Await resolve={data}>
          {(data) => <ProductsListRoute data={data} /> }
        </Await>
      </Suspense>
    </div>
  );
}
