import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import Footer from "~/Layout/Footer/Footer";
import Header from "~/Layout/Header/Header";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import Sidebar from "~/components/Store/SideBar/SideBar";
import SortTypesList from "~/components/Store/Sort/SortTypesList";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type { ProductData } from "~/services/product.server";
import styles from "./styles.module.css";

type CategoryPageProps = {
  data: {
    products: ProductData;
    categories: Category[];
  };
};

const CategoryPage: FC<SerializeFrom<CategoryPageProps>> = ({ data }) => {
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
          </div>
        </main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </PageLayout>
    </>
  );
};

export default CategoryPage;
