import type { SerializeFrom } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import type { FC } from "react";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import Header from "~/components/Header/Header";
import Pagination from "~/components/Pagination/Pagination";
import ProductsList from "~/components/ProductsList/ProductsList";
import SortTypesList from "~/components/Sort/SortTypesList";
import type { StorePageProps } from "~/types/types";
import Sidebar from "../../components/SideBar/Sidebar";
import styles from "./styles.module.css";

const StorePage: FC<SerializeFrom<StorePageProps>> = ({ data }) => {
  const location = useLocation();

  const breadcrumbs = [
    { label: "Home", link: "/products" },
    {
      label: `${location.search.slice(10)}`,
      link: `/products/?category=${location.search.slice(10)}`,
    },
  ];

  return (
    <>
      <PageLayout>
        <Header />
        <aside className={styles.sidebar}>
          <Sidebar categories={data.categories} />
        </aside>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <div className={styles.sort}>
              <SortTypesList />
            </div>
            <div>
              <Breadcrumbs admin={false} breadcrumbs={breadcrumbs} />
            </div>
            <ProductsList productsData={data.products} />
            <div className="paginationContainer">
              <Pagination
                admin={false}
                currentPage={data.page}
                totalPages={data.products.totalPages}
              />
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
};

export default StorePage;
