import React, { FC } from "react";
import ProductList from "./ProductList/ProductList";
import { SerializeFrom } from "@remix-run/node";
import { ProductData } from "~/services/product.server";
import styles from "./styles.module.css";
import { Cart } from "@prisma/client";
import { SearchBar } from "~/components/Header/SearchBar/SearchBar";

export interface AddProductProps {
  data: ProductData;
  cart: Cart,
  customerId?: number
}

const AddProducts: FC<SerializeFrom<AddProductProps>> = ({ data, cart, customerId }) => {
  return (
    <>
      <div>
        <SearchBar action={`/admin/customers/customer/${customerId}/cart/`} />
      </div>
      <div className={styles.productList}>
        <ProductList data={data} cart={cart} />
      </div>
    </>
  );
};

export default AddProducts;
