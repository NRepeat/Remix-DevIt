import Sidebar from "../../components/SideBar/Sidebar";
import { useLocation, useNavigation, useRouteLoaderData } from "@remix-run/react";
import style from "./style.module.css";
import { FC } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { Category, Product } from "@prisma/client";
import Pagination from "~/components/Pagination/pagination";
import { SerializeFrom } from "@remix-run/node";


export interface StorePageProps {
  data: {
    cart: {
      productId: string;
      quantity: number;
    }[];
    categories: Category[];
    products: Product[];
    totalPages: number |undefined;
    page: number;
  };
}

const ProductsListRoute: FC<SerializeFrom<StorePageProps> > = ({ data }) => {

  const toggleSideBarVisible = !!useRouteLoaderData("routes/products/$productId");

  return (
    <>
      <div className={style.container}>
        {!toggleSideBarVisible && (
          <aside className={style.sidebar}>
            <Sidebar categories={data.categories} />
          </aside>
        )}
        <main className={style.main}>
          <ProductsList data={data} />
          <div className="paginationContainer">
            <Pagination currentPage={data.page} totalPages={data.totalPages} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsListRoute;
