import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import clsx from "clsx";
import React from "react";
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
    cart: {
      productId: string;
      quantity: number;
    }[];
    categories: Category[];
    isCustomerWithData: isCustomerWithData;
    isMemberWithData: isMemberWithData;
  }>;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, data }) => {
  const { isCustomerWithData } = data;
  return (
    <div
      className={clsx(
        styles.gridLayout

      )}
    >
      <Header>

        <StoreHeader customer={isCustomerWithData.isCustomer} />
      </Header>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
