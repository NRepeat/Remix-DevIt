import { Outlet } from "@remix-run/react";
import styles from "./styles.module.css";
const Cart = () => {
  return (
    <section className={styles.section}>
      My Cart
      <Outlet />
    </section>
  );
};

export default Cart;
