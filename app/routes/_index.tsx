import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  useLoaderData,
} from "@remix-run/react";
import Pagination from "~/components/Pagination/pagination";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getLimitProdacts } from "~/services/product.server";
import rootStylesHref from "../styles/rootIndex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("page");
  const limit = 12;
  const par = "";
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const skip = (page - 1) * limit;
  const products = await getLimitProdacts(limit, skip, par);
  console.log("🚀 ~ file: _index.tsx:22 ~ loader ~ products:", products)
  if(products.limit === 0 ){
    throw new Response("Page Not Found", { status: 404 });
  }
  return json({ products, page });
};

function Home() {
  const data = useLoaderData<typeof loader>();
  const currentPage = data.page;
  const totalPages = Math.ceil(data.products.total / data.products.limit);

  return (
    <div className="container">
      <ProductsList products={data.products.products} />
      <div className="paginationContainer">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Home;
