import type { Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { AddToCart } from "~/components/Store/AddToCart/AddToCart";
import ProductInformation from "~/components/Store/Product/ProductInformation/ProductInformation";
import styles from "./styles.module.css";

const ProductListItem: FC<{
  product: SerializeFrom<Product>;
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
