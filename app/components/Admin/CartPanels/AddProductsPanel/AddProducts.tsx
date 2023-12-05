import type { FC } from "react";
import React from "react";
import ProductList from "./ProductsList/ProductsList";
import type { SerializeFrom } from "@remix-run/node";
import type { ProductData } from "~/services/product.server";
import styles from "./styles.module.css";
import type { Cart } from "@prisma/client";
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
