import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { CartWithCartItems } from "../SingleCart";
import styles from "./styles.module.css";

type CartItemsListProps = {
  cart: CartWithCartItems;
};

const CartItemsList: FC<SerializeFrom<CartItemsListProps>> = ({ cart }) => {
  return (
    <section className={styles.container}>
      {cart.cartItems.map((item) => (
        <div className={styles.card} key={item.id}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.img}
              src={item.product?.thumbnail}
              alt={item.product?.title}
            />
          </div>
          <div>
            <span className={styles.info}>
              <p>{item.product?.title}</p>
              <p>{item.product?.description}</p>
              <p>
                {item.product?.price}
                {item.product?.rating}{" "}
              </p>
            </span>

            <div className={styles.action}>
              <button>Edit</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CartItemsList;
