import { FC } from "react";
import { Product } from "~/types/types";
import { AddToCart } from "../AddToCart/AddToCart";
import ProductInformation from "../ProductInformation/ProductInformation";
import styles from "./styles.module.css";


export interface SingleProduct {
  data: {
    product: Product;
    cart: {
      productId: string;
      quantity: number;
    };
  }
}

const SingleProduct: FC<SingleProduct> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.poster}>
          <img src={data.product.thumbnail} alt={data.product.title} />
        </div>
        <div className={styles.information}>
          <ProductInformation product={data.product} />
          <AddToCart product={data.product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
