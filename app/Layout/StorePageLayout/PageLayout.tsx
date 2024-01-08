import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import React from "react";
import Sidebar from "~/components/Store/SideBar/SideBar";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import type { isMemberWithData } from "~/utils/validation.server";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./styles.module.css";

export interface PageLayoutProps {
  children: React.ReactNode;
  data: SerializeFrom<{
    categories: Category[];
    customer: CustomerWithoutPassword | null;
    isMemberWithData?: isMemberWithData;
  }>;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, data }) => {
  const categoriesLinksArr = data.categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    path: `/categories/${category.slug}`,
  }));
  const { customer } = data;
  return (
    <section className={styles.gridLayout}>
      <Header>
        <StoreHeader customer={customer} />
      </Header>
      <Sidebar links={categoriesLinksArr} />
      {children}
      <Footer />
    </section>
  );
};

export default PageLayout;
