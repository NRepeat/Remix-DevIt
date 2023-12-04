import React, { FC } from "react";
import { CustomerSearch as ProductSearch } from "../../CustomersPanels/CustomerSearch/CustomerSearch";
import ProductList from "./ProductList/ProductList";
import { SerializeFrom } from "@remix-run/node";
import { ProductData } from "~/services/product.server";
import styles from "./styles.module.css";

export interface AddProductProps {
  data: ProductData;
}

const AddProducts: FC<SerializeFrom<AddProductProps>> = ({ data }) => {
  return (
    <>
      <div>
        <ProductSearch />
      </div>
      <div className={styles.productList}>
        <ProductList data={data} />
      </div>
    </>
  );
};

export default AddProducts;
