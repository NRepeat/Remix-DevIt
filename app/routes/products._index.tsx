import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StorePage from "~/Pages/StorePage/StorePage";
import { authenticator } from "~/services/auth.server";
import { createCart } from "~/services/cartSession.server";
import {
  getAllProductCategories,
  getProductsByCategory,
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
  const categoryQuery = url.searchParams.get("category");
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const categories = await getAllProductCategories();
  let user = await authenticator.isAuthenticated(request);
  if (categoryQuery !== "" && !!categoryQuery) {
    const products = await getProductsByCategory(categoryQuery!, sort!);
    if (!products) {
      throw new Response("Page Not Found", { status: 404 });
    }
    return json({ products, page, cart: cart.items(), categories, user });
  }
  if (categoryQuery === "") {
    return redirect("/products");
  }
  if (searchQuery === "") {
    return redirect("/products");
  }
  const products = await searchProduct(searchQuery!, page, sort!);
  if (!products) {
    throw new Response("Page Not Found", { status: 404 });
  }
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
