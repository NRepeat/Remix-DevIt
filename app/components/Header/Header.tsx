import { FC } from "react";
import styles from "./styles.module.css";
import { CartIcon } from "../CartInfo/CartInfo";
import { Link } from "@remix-run/react";
import { SearchBar } from "./SearchBar/SearchBar";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.topBar}>
        <Link className={styles.title} to={"/"}>
          Store
        </Link>
        <SearchBar />
        <CartIcon />
      </div>
    </div>
  );
};

export default Header;
