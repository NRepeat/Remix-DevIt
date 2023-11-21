import { FC } from "react";
import styles from "./styles.module.css";
import { CartIcon } from "../CartInfo/CartInfo";



const Header:FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.topBar}>
        <p className={styles.title}>Store</p>
        <form action="" role="serch" className={styles.serch}>
          <input type="text" placeholder="Search" />
        </form>
        <CartIcon />
      </div>
    </div>
  );
};

export default Header;
