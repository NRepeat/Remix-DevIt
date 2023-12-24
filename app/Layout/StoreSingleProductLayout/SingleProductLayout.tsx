import type { FC } from "react";
import React from "react";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import Header from "../Header/Header";
import styles from "./styles.module.css";

export interface SingleProductLayoutPageLayoutProps {
  children: React.ReactNode;
}
export const SingleProductLayout: FC<SingleProductLayoutPageLayoutProps> = ({
  children,
}) => {
  return (
    <section className={styles.singleProductGrid}>
      <Header>
        <StoreHeader customer={true} />
      </Header>
      {children}
    </section>
  );
};
