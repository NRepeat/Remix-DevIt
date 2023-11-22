import { FC } from "react";
import styles from "./styles.module.css";
import { Product } from "~/types/types";
import { AddToCart } from "../AddToCart/AddToCart";

export interface SingleProduct{ 
  product:Product,
  quantity:number 
}

const SingleProduct: FC< SingleProduct> = ({ product}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.poster}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className={styles.informationWrapper}>
          <div className={styles.information}>
            <h2>{product.title}</h2>
            <p>{product.brand}</p>
            <p> {product.description}</p>
            <p>${product.price}</p>
          </div>
          <AddToCart product={product}  />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
