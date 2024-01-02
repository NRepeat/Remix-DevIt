import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import React from "react";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./styles.module.css";

export interface SingleProductLayoutPageLayoutProps {
  children: React.ReactNode;
  customer: SerializeFrom<CustomerWithoutPassword> | null;
}
export const SingleProductLayout: FC<SingleProductLayoutPageLayoutProps> = ({
  children,
  customer,
}) => {
  return (
    <section className={styles.singleProductGrid}>
      <Header>
        <StoreHeader customer={customer} />
      </Header>
      {children}
      <Footer />
    </section>
  );
};
