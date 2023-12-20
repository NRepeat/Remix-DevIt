import { Link } from "@remix-run/react";
import type { FC } from "react";
import { SearchBar } from "../../Ui/SearchBar/SearchBar";
import { CartIcon } from "../CartInfo/CartInfo";
import styles from "./styles.module.css";

const StoreHeader: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <Link className={styles.title} to={"/"}>
          <h1>Store</h1>
        </Link>
      </div>

      <div className={styles.searchBarCartWrapper}>
        <SearchBar action="/search/" />
        <CartIcon />
      </div>
    </div>
  );
};

export default StoreHeader;
