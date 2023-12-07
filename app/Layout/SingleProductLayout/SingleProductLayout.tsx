import type { FC } from "react";
import React from "react";
import styles from "./styles.module.css";

export interface SingleProductLayoutPageLayoutProps {
  children: React.ReactNode;
}
export const SingleProductLayout: FC<SingleProductLayoutPageLayoutProps> = ({
  children,
}) => {
  return <div className={styles.singleProductGrid}>{children}</div>;
};
