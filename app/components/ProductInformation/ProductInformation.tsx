import type { FC } from "react";
import styles from "./styles.module.css";
import type { Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export interface SingleProduct {
  product: Product;
}

const ProductInformation: FC<SerializeFrom<SingleProduct>> = ({ product }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.description}> {product.description}</p>
      <div className={styles.priceWrapper}>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.rating}>Rating {product.rating}/5</p>
      </div>
    </div>
  );
};

export default ProductInformation;
