import type { FC } from "react";
import type { CartProduct } from "~/types/types";
import styles from "../styles.module.css";

export const ProductInformation: FC<{ product: CartProduct }> = ({
  product,
}) => {
  return (
    <>
      <div>
        <img
          className={styles.thumbnail}
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div>
        <p className={styles.id}>ID: {product.id}</p>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.stock}>Stock:{product.stock}</p>
      </div>
    </>
  );
};
