import { Link } from "@remix-run/react";
import type { FC } from "react";
import { AddToCart } from "~/components/Store/AddToCart/AddToCart";
import type { SingleProduct } from "~/components/Store/Product/ProductInformation/ProductInformation";
import ProductInformation from "~/components/Store/Product/ProductInformation/ProductInformation";
import styles from "./styles.module.css";

const ProductListItem: FC<SingleProduct> = ({ product }) => {
  return (
    <>
      {product ? (
        <div className={styles.card}>
          <Link className={styles.link} to={`/product/${product.slug}`}>
            <div>
              <div className={styles.avatar}>
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <ProductInformation product={product} />
            </div>
          </Link>
          <AddToCart product={product} />
        </div>
      ) : (
        <p>No Item</p>
      )}
    </>
  );
};

export default ProductListItem;
