import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/Sidebar";
import { Outlet, useRouteLoaderData } from "@remix-run/react";
import style from "./style.module.css";
import { FC } from "react";
import GlobalLoader from "../../components/GlobalLoading/GlobalLoader";
import ProductsList from "~/components/ProductsList/ProductsList";
import Pagination from "~/components/Pagination/pagination";
import { Product, ProductResponse } from "~/types/types";

export interface StorePageProps {
  data: {
    cart: {
      productId: string;
      quantity: number;
    }[];
    categories: string[];
    products: ProductResponse
    page: number
  };
}

const ProductsListRoute: FC<StorePageProps> = ({ data }) => {
  const totalPages = Math.ceil(data.products.total / data.products.limit);

  const toggleSideBarVisible = !!useRouteLoaderData(
    "routes/$productId"
  );

  return (
    <>
    
      <div className={style.container}>
        {!toggleSideBarVisible && (
          <aside className={style.sidebar}>
            <Sidebar categories={data.categories} />
          </aside>
        )}

        <div className={style.mainWrapper}>
          <main className={style.main}>
            <ProductsList data={data} />
            <div className="paginationContainer">
              <Pagination currentPage={data.page} totalPages={totalPages} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductsListRoute;
