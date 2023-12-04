import React, { FC } from "react";
import { CustomerSearch as ProductSearch } from "../../CustomersPanels/CustomerSearch/CustomerSearch";
import ProductList from "./ProductList/ProductList";
import { SerializeFrom } from "@remix-run/node";
import { ProductData } from "~/services/product.server";
import styles from "./styles.module.css";
import { Cart } from "@prisma/client";

export interface AddProductProps {
  data: ProductData;
  cart:Cart,
}

const AddProducts: FC<SerializeFrom<AddProductProps>> = ({ data,cart }) => {
  return (
    <>
      <div>
        <ProductSearch />
      </div>
      <div className={styles.productList}>
        <ProductList data={data} cart ={cart}   />
      </div>
    </>
  );
}; 

export default AddProducts;
