import React from "react";
import styles from "./styles.module.css";

export type Header = {
  children: React.ReactNode;
};

const Header: React.FC<Header> = ({ children }) => {
  return <header className={styles.gridHeader}>{children}</header>;
};

export default Header;
