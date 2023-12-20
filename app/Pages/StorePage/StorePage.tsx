import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import Footer from "~/Layout/Footer/Footer";
import Header from "~/Layout/Header/Header";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type { StorePageProps } from "~/types/types";
import Sidebar from "../../components/Store/SideBar/SideBar";
import styles from "./styles.module.css";

const StorePage: FC<SerializeFrom<StorePageProps>> = ({ data }) => {
  return (
    <PageLayout isAdmin={false}>
      <Header>
        <StoreHeader customer={data.isCustomerAuthenticated} />
      </Header>
      <div className={styles.sidebar}>
        <Sidebar links={data.categories} />
      </div>
      <main className={styles.main}>
        <ProductsList productsData={data.products} />
      </main>
      <Pagination
        admin={false}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
      <Footer />
    </PageLayout>
  );
};

export default StorePage;
