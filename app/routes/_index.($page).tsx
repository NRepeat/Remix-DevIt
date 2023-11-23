import { ActionFunctionArgs, LoaderFunctionArgs, defer } from "@remix-run/node";
import { Await, useLoaderData, } from "@remix-run/react";
import Pagination from "~/components/Pagination/pagination";
import ProductsList from "~/components/ProductsList/ProductsList";
import { getLimitProdacts } from "~/services/product.server";
import style from "../style.module.css";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const s = url.searchParams.getAll("s").join();
  const limit = 6;
  const par = "";
  const page = params.page ? parseInt(params.page) || 1 : 1;
  const skip = (page - 1) * limit;
  const products = await getLimitProdacts(limit, skip, par);
  return defer({ products, page, s });
};

function Home() {
  const data = useLoaderData<typeof loader>();
  const currentPage = (data.page)
  const totalPages = Math.ceil(data.products.total / data.products.limit);
  const sortedProducts = [...data.products.products].sort((a, b) =>
    data.s === "Price down" ? a.price - b.price : b.price - a.price
  );

  return (

    <div >
      <ProductsList products={sortedProducts} />
      <div className={style.pagContainer}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Home;
