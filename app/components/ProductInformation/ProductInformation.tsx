import { FC } from "react";
import styles from "./styles.module.css";
import { Product } from "~/types/types";

export interface SingleProduct { 
  product:Product

}


const ProductInformation: FC<SingleProduct> = ({ product }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.description}> {product.description}</p>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
};

export default ProductInformation;
