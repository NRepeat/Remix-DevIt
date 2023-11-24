import GloabalLoader from "../../components/GlobalLoading/GlobalLoading";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/Sidebar";
import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
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
  return (
    <>
      <GloabalLoader />
      <Header />
      <div className={style.container}>
        <aside className={style.sidebar}>
          <Sidebar categories={data.categories} />
        </aside>
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
