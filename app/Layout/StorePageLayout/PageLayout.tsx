import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import React from "react";
import Sidebar from "~/components/Store/SideBar/SideBar";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type {
  isCustomerWithData,
  isMemberWithData,
} from "~/utils/validation.server";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./styles.module.css";

export interface PageLayoutProps {
  children: React.ReactNode;
  data: SerializeFrom<{
    categories: Category[];
    isCustomerWithData: isCustomerWithData;
    isMemberWithData?: isMemberWithData;
  }>;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, data }) => {
  const { isCustomerWithData } = data;
  return (
    <section className={styles.gridLayout}>
      <Header>
        <StoreHeader customer={isCustomerWithData.isCustomer} />
      </Header>
      <Sidebar links={data.categories} />
      {children}
      <Footer />
    </section>
  );
};

export default PageLayout;
