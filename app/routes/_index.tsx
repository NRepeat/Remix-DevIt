import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StorePage from "~/Pages/StorePage/StorePage";
import { customerAuthenticator } from "~/services/auth.server";
import { createCart } from "~/services/cartSession.server";
import {
  getAllProductCategories,
  searchProduct,
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
  const searchQuery = url.searchParams.get("search");
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const categories = await getAllProductCategories();
  let user = await customerAuthenticator.isAuthenticated(request);

  if (searchQuery === "") {
    return redirect("/");
  }
  const products = await searchProduct(searchQuery!, page, sort!);
  return json({ products, page, cart: cart.items(), categories, user });
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="bg-pd-index">
      <StorePage data={data} />
    </div>
  );
}
