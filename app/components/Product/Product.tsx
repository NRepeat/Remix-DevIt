import { FC } from "react";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { Product } from "~/types/types";

const SingleProduct: FC<{ product: Product }> = ({ product }) => {
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
          <Link to={"/"}>
          <button className={styles.bcontact}>Add to cart</button>
        </Link>
        </div>
    
      </div>
    </div>
  );
};

export default SingleProduct;
