import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import Pagination from "~/components/Store/Pagination/Pagination";
import type { AddProductProps } from "../AddProductsPanel";
import ProductRow from "../Product/Product";
import styles from "./styles.module.css";

const ProductsList: FC<SerializeFrom<AddProductProps>> = ({ data, cart }) => {
  return (
    <div className={styles.container}>
      <Pagination
        admin={true}
        currentPage={data.page!}
        totalPages={data.totalPages!}
      />
      <ul className={styles.list}>
        {data.products.map((product) => (
          <ProductRow key={product.id} product={product} cart={cart} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
