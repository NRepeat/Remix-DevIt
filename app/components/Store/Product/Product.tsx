import type { Category, Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import { AddToCart } from "../AddToCart/AddToCart";
import ProductImages from "./ProductImages/ProductImages";
import styles from "./styles.module.css";

export interface SingleProduct {
  data: {
    product: Product & { category: Category };
    cart: {
      productId: string;
      quantity: number;
    };
  };
}

const SingleProduct: FC<SerializeFrom<SingleProduct>> = ({ data }) => {
  return (
    <>
      <div>
        <div className={styles.poster}>
          <img src={data.product.thumbnail} alt={data.product.title} />
        </div>
        <ProductImages product={data.product} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.information}>
          <p className={styles.brand}> {data.product.brand}</p>
          <p className={styles.title}>{data.product.title}</p>
          <p className={styles.description}>{data.product.description}</p>
          <p className={styles.price}>
            {" "}
            <span className={styles.prevPrice}>${data.product.price}</span> $
            {(
              data.product.price *
              data.product.discountPercentage *
              0.1
            ).toFixed(2)}
          </p>
          <AddToCart product={data.product} />

          <p className={styles.rating}>
            {data.product.rating}/5 on critic meta
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
