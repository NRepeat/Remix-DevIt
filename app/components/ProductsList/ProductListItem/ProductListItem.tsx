import {
  Link,
  useMatches,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { FC } from "react";
import { Product } from "~/types/types";
import styles from "./styles.module.css";
import { AddToCart } from "~/components/AddToCart/AddToCart";
import ProductInformation from "~/components/ProductInformation/ProductInformation";

const ProductListItem: FC<{
  product: Product;
}> = ({ product }) => {
  return (
    <>
      {product ? (
        <div className={styles.card}>
          <Link className={styles.link} to={`/products/product/${product.id}`}>
            <div>
              <div className={styles.avatar}>
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div>
                <ProductInformation product={product} />
              </div>
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
