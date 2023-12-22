import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import clsx from "clsx";
import React from "react";
import AdminHeader from "~/components/Admin/Header/Header";
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
  const { isCustomerWithData, isMemberWithData } = data;
  const nav = useLocation();
  return (
    <div
      className={clsx(
        { [styles.gridLayout]: !isMemberWithData.isMember },
        { [styles.adminLayout]: isMemberWithData.isMember }
      )}
    >
      <Header>
        {isMemberWithData.member || nav.pathname.includes("/admin") ? (
          <AdminHeader member={isMemberWithData.member} />
        ) : (
          <StoreHeader customer={isCustomerWithData.isCustomer} />
        )}
      </Header>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
