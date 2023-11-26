import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import Pagination from "~/components/Pagination/pagination";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getLimitProdacts } from "~/services/product.server";
import rootStylesHref from "../styles/rootIndex.css";
import SortedProductsList from "~/components/Header/Sort/Sort";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("search");
  const sortQuery = url.searchParams.get("sort");
  const sortType = sortQuery !== null ? sortQuery : "asc";
  const limit = 6;
  const par = "";
  const page = pageQuery ? parseInt(pageQuery) || 1 : 1;
  const skip = (page - 1) * limit;
  const products = await getLimitProdacts(limit, skip, par);

  return json({ products, page, sortType });
};

function Home() {
  const data = useLoaderData<typeof loader>();
  const currentPage = data.page;
  const totalPages = Math.ceil(data.products.total / data.products.limit);

  return (
    <>
      <SortedProductsList
        ProductsList={ProductsList}
        order={data.sortType}
        products={data.products.products}
      />
      <div className="paginationContainer">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}

export default Home;
