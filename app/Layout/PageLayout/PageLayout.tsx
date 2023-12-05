import React from "react";
import styles from "./styles.module.css";
export interface PageLayout {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayout> = ({ children }) => {
  return <div className={styles.gridLayout}>{children}</div>;
};

export default PageLayout;
