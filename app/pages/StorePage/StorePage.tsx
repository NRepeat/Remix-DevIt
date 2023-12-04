import Sidebar from "../../components/SideBar/Sidebar";
import { useLocation, useNavigation, useRouteLoaderData } from "@remix-run/react";
import style from "./style.module.css";
import { FC } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { Cart, Category, Product } from "@prisma/client";
import Pagination from "~/components/Pagination/Pagination";
import { SerializeFrom } from "@remix-run/node";
import { ProductData } from "~/services/product.server";


export interface StorePageProps {
  data:{
products: ProductData;
    page: number;
    cart: {
        productId: string;
        quantity: number;
    }[];
    categories: {
        id: number;
        slug: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
  }

}

const ProductsListRoute: FC<SerializeFrom<StorePageProps>> = ({ data }) => {

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
          <ProductsList productsData={data.products} />
          <div className="paginationContainer">
            <Pagination admin={false} currentPage={data.page} totalPages={data.products.totalPages} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsListRoute;
