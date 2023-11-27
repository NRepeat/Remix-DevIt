import GloabalLoader from "../../components/GlobalLoading/GlobalLoading";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/Sidebar";
import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import style from "./style.module.css";
import { FC } from "react";


export interface StorePageProps {
  data: {
    cart: {
      productId: string;
      quantity: number;
    }[];
    categories: string[];
  };
}

const StorePage: FC<StorePageProps> = ({ data }) => {
  const togleSideBarVisible = useRouteLoaderData("routes/products.$productId");
  return (
    <>
      <GloabalLoader />
      <Header />
      <div className={style.container}>
        {!togleSideBarVisible && (
          <aside className={style.sidebar}>
            <Sidebar categories={data.categories} />
          </aside>
        )}

        <div className={style.mainWrapper}>
          <main className={style.main}>
            <Outlet />
          </main>
        </div>
      </div>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </>
  );
};

export default StorePage;
