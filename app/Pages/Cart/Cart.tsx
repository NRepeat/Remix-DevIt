import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { CartWithItems } from "~/services/cart.server";
import ItemsList from "./ItemsList/ItemsList";
import styles from "./styles.module.css";

type CartProps = {
  items: SerializeFrom<CartWithItems> | null;
};

const Cart: FC<CartProps> = ({ items }) => {
  return (
    <section className={styles.section}>
      My Cart
      <p>No items in cart </p>
      {items && <ItemsList items={items} />}
    </section>
  );
};

export default Cart;
