import { Link } from "@remix-run/react";
import type { FC } from "react";
import { CartIcon } from "../Store/CartInfo/CartInfo";
import { SearchBar } from "./SearchBar/SearchBar";
import styles from "./styles.module.css";

const StoreHeader: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <Link className={styles.title} to={"/products"}>
          <h1>Store</h1>
        </Link>
      </div>

      <div className={styles.searchBarCartWrapper}>
        <SearchBar action="/products/" />
        <CartIcon />
      </div>
    </div>
  );
};

export default StoreHeader;
