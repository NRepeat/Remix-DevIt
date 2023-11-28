import Sidebar from "../../components/SideBar/Sidebar";
import { useRouteLoaderData } from "@remix-run/react";
import style from "./style.module.css";
import { FC } from "react";
import ProductsList from "~/components/ProductsList/ProductsList";
import { Category, Product } from "@prisma/client";

export interface StorePageProps {
  data: {
    cart: {
      productId: string;
      quantity: number;
    }[];
    categories:Category[]
    products: Product[];
    page: number;
  };
}

const ProductsListRoute: FC<StorePageProps> = ({ data }) => {
  // const totalPages = Math.ceil(data.products.total / data.products.limit);

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
        <main className={style.main}>
          <ProductsList data={data} />
          {/* <div className="paginationContainer">
              <Pagination currentPage={data.page} totalPages={totalPages} />
            </div> */}
        </main>
      </div>
    </>
  );
};

export default ProductsListRoute;
