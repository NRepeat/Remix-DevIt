import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import Footer from "~/Layout/Footer/Footer";
import Header from "~/Layout/Header/Header";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import SortTypesList from "~/components/Store/Sort/SortTypesList";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type { StorePageProps } from "~/types/types";
import Sidebar from "../../components/Store/SideBar/SideBar";
import styles from "./styles.module.css";

const StorePage: FC<SerializeFrom<StorePageProps>> = ({ data }) => {
  return (
    <>
      <PageLayout isAdmin={false}>
        <Header>
          <StoreHeader />
        </Header>
        <div className={styles.sidebar}>
          <Sidebar links={data.categories} />
        </div>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <div className={styles.sort}>
              <SortTypesList />
            </div>
            <div className={styles.productsListContainer}>
              <ProductsList productsData={data.products} />
            </div>
            <div className={styles.paginationContainer}>
              <Pagination
                admin={false}
                currentPage={data.page}
                totalPages={data.products.totalPages}
              />
            </div>
          </div>
        </main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </PageLayout>
    </>
  );
};

export default StorePage;
