import type { Category, Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import styles from "./styles.module.css";

export interface SingleProduct {
  product:
    | SerializeFrom<
        {
          category?: Category;
        } & Product
      >
    | ({
        category?: Category;
      } & Product);
}

const ProductInformation: FC<SingleProduct> = ({ product }) => {
  return (
    <div className={styles.container}>
      <p className={styles.brand}> {product.brand}</p>
      <p className={styles.title}>{product.title}</p>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
};

export default ProductInformation;
