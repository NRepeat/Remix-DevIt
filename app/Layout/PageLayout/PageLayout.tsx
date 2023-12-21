import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import clsx from "clsx";
import React from "react";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type { ProductData } from "~/services/product.server";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./styles.module.css";
export interface PageLayoutProps {
  children?: React.ReactNode;
  isAdmin: boolean;
  data: SerializeFrom<{
    cart: {
      productId: string;
      quantity: number;
    }[];
    products?: ProductData;
    categories: Category[];
    page?: number;
    isCustomerAuthenticated: boolean;
  }>;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isAdmin, data }) => {
  return (
    <div className={clsx(styles.gridLayout, { [styles.adminLayout]: isAdmin })}>
      <Header>
        <StoreHeader customer={data.isCustomerAuthenticated} />
      </Header>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
