import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import Sidebar from "~/components/Store/SideBar/SideBar";
import { customerAuthenticator } from "~/services/auth.server";
import { createCart } from "~/services/cartSession.server";
import {
  getAllProductCategories,
  getAllProducts,
} from "~/services/product.server";
import { getSession } from "~/services/session.server";
import { parseAndValidateNumber } from "~/utils/validation.server";
import rootIndexStylesHref from "../../styles/rootIndex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootIndexStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const isCustomerAuthenticated =
    !!(await customerAuthenticator.isAuthenticated(request));
  const cart = createCart(session);
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;
  const categories = await getAllProductCategories();
  const products = await getAllProducts(page, sort);
  return json({
    products,
    page,
    cart: cart.items(),
    categories,
    isCustomerAuthenticated,
  });
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <ProductsList productsData={data.products} />
      <p className="title">Latest drops</p>
      <Sidebar links={data.categories} />
      <Pagination
        admin={false}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
