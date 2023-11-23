import { FC } from "react";
import { SingleProduct } from "../Product/Product";
import styles from "./styles.module.css";
const ProductInformation: FC<SingleProduct> = ({ product }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.brand}</p>
      <p className={styles.description}> {product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductInformation;
