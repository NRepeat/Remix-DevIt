import { FC } from "react";
import styles from "./styles.module.css";
import { CartIcon } from "../CartInfo/CartInfo";
import { Link } from "@remix-run/react";



const Header:FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.topBar}>
        <Link to={'/'}> 
        <p className={styles.title}>Store</p>
        </Link>
        <form action="" role="serch" className={styles.serch}>
          <input type="text" placeholder="Search" />
        </form>
        <CartIcon />
      </div>
    </div>
  );
};

export default Header;
