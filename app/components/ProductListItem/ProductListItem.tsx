import { Link } from "@remix-run/react";
import { FC } from "react";
import { Product } from "~/types/types";

import styles from "./styles.module.css";
import { AddToCart } from "../AddToCart/AddToCart";

const ProductListItem: FC<{ product: Product }> = ({ product }) => {
  return (
    <>
      {product ? (
        <>
          <Link className={styles.link} to={`/product/${product.id}`}>
            <div className={styles.card}>
              <div className={styles.wrapper}>
                <div className={styles.avatar}>
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>${product.price}</p>
                <AddToCart product={product} />
              </div>
            </div>
          </Link>
        </>
      ) : (
        <i>No Item</i>
      )}
    </>
  );
};

ProductListItem.displayName = "ProductListItem";

export default ProductListItem;
