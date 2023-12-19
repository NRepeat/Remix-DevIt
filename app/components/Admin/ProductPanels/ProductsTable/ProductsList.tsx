import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import Table from "./Table";
import styles from "./styles.module.css";
const ProductsList: FC<SerializeFrom<ProductData>> = ({ products }) => {
  return (
    <div className={styles.container}>
      <Table products={products} />
    </div>
  );
};

export default ProductsList;
