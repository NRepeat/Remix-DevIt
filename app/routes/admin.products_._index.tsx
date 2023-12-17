import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/Admin/ProductPanels/ProductsTable/ProductsList";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import { SearchBar } from "~/components/SearchBar/SearchBar";
import Pagination from "~/components/Store/Pagination/Pagination";
import { searchProduct } from "~/services/product.server";
import adminProductsStylesHref from "../styles/adminProductsStylesHref.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminProductsStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseInt(pageQuery) : 1;

  if (searchQuery === "") {
    return redirect("/admin/products");
  }

  const products = await searchProduct(searchQuery!, page, sort!);
  if (!products) {
    throw new Response("Page Not Found", { status: 404 });
  }
  return json({ products, page });
};
const breadcrumbs = [{ label: "Products", link: "/admin/products" }];

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />
      <div className="search">
        <SearchBar action="/admin/products" />
        <Link className="link" to={"/admin/customers/customer/create"}>
          Create product
        </Link>
      </div>

      <ProductsList products={data.products.products} />
      <Pagination
        admin={true}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
