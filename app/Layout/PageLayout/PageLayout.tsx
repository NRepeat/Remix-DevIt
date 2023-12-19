import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";
export interface PageLayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isAdmin }) => {
  return (
    <div className={clsx(styles.gridLayout, { [styles.adminLayout]: isAdmin })}>
      {children}
    </div>
  );
};

export default PageLayout;
