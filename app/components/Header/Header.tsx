import type { FC } from "react";
import styles from "./styles.module.css";
import { CartIcon } from "../CartInfo/CartInfo";
import { Link } from "@remix-run/react";
import { SearchBar } from "./SearchBar/SearchBar";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.topBar}>
        <Link className={styles.title} to={"/products"}>
          Store
        </Link>
        <SearchBar action="/products/search" />
        <CartIcon />
      </div>
    </div>
  );
};

export default Header;
