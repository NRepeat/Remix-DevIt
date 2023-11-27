import { Link, useMatches, useRouteError, useRouteLoaderData } from "@remix-run/react";
import { FC } from "react";
import { Product } from "~/types/types";
import styles from "./styles.module.css";
import { AddToCart } from "~/components/AddToCart/AddToCart";
import ProductInformation from "~/components/ProductInformation/ProductInformation";


const ProductListItem: FC<{
  product: Product
}> = ({ product }) => {
console.log("🚀 ~ file: ProductListItem.tsx:12 ~ product:", product)

  return (
    <>
      {product ? (
        <>
          <Link className={styles.link} to={`/products/product/${product.id}`}>
            <div className={styles.card}>
              <div className={styles.wrapper}>
                <div className={styles.avatar}>
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <ProductInformation product={product} />
              </div>
            </div>
          </Link>
          <AddToCart product={product} />
        </>
      ) : (
        <p>No Item</p>
      )}
    </>
  );
};

export default ProductListItem;
