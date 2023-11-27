import { FC } from "react";
import styles from "./styles.module.css";
import { Product } from "~/types/types";
import { AddToCart } from "../AddToCart/AddToCart";
import ProductInformation from "../ProductInformation/ProductInformation";


export interface SingleProduct {
  product: Product;
}

const SingleProduct: FC<SingleProduct> = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.poster}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className={styles.information}>
          <ProductInformation product={product} />
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
