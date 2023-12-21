import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import ProductListItem from "../ProductsList/ProductListItem/ProductListItem";
import styles from "./styles.module.css";

type ProductsLikeProps = {
  data: SerializeFrom<ProductData>;
};
const ProductsLike: FC<ProductsLikeProps> = ({ data }) => {
  return (
    <div className={styles.like}>
      <p className={styles.title}>You may also like </p>
      <div className={styles.container}>
        {data.products.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsLike;
