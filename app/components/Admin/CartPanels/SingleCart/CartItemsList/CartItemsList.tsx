import type { SerializeFrom } from "@remix-run/node";
import { type FC } from "react";
import type { CartWithCartItems } from "../SingleCart";
import List from "./List";
import styles from "./styles.module.css";

export type CartItemsListProps = {
  cart: SerializeFrom<CartWithCartItems>;
};

const CartItemsList: FC<SerializeFrom<CartItemsListProps>> = ({ cart }) => {
  return (
    <section className={styles.container}>
      <List cart={cart} />
    </section>
  );
};

export default CartItemsList;
