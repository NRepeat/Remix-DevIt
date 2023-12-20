import type { Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import styles from "./styles.module.css";

export interface SingleProduct {
  product: Product;
}

const ProductInformation: FC<SerializeFrom<SingleProduct>> = ({ product }) => {
  return (
    <div className={styles.container}>
      <p className={styles.brand}> {product.brand}</p>
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
};

export default ProductInformation;
