import Sidebar from "../../components/SideBar/Sidebar";
import { useRouteLoaderData } from "@remix-run/react";
import style from "./style.module.css";
import type { FC } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import type { SerializeFrom } from "@remix-run/node";
import type { ProductData } from "~/services/product.server";
import Pagination from "~/components/Pagination/Pagination";

export interface StorePageProps {
  data: {
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
  };
}

const ProductsListRoute: FC<SerializeFrom<StorePageProps>> = ({ data }) => {
  const toggleSideBarVisible = !!useRouteLoaderData(
    "routes/products/$productId"
  );

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
            <Pagination
              admin={false}
              currentPage={data.page}
              totalPages={data.products.totalPages}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsListRoute;
