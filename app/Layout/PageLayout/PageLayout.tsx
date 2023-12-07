import React from "react";
import styles from "./styles.module.css";
export interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className={styles.gridLayout}>{children}</div>;
};

export default PageLayout;
