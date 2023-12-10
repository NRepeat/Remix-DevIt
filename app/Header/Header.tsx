import React from "react";
import styles from "./styles.module.css";

export type Header = {
  children: React.ReactNode;
};

const Header: React.FC<Header> = ({ children }) => {
  return <div className={styles.gridHeader}>{children}</div>;
};

export default Header;
