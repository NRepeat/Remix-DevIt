import type { Cart } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import { SearchBar } from "~/components/StoreHeader/SearchBar/SearchBar";
import type { ProductData } from "~/services/product.server";
import ProductList from "./ProductsList/ProductsList";

export interface AddProductProps {
  data: ProductData;
  cart: Cart;
  customerId?: number;
}

const AddProducts: FC<SerializeFrom<AddProductProps>> = ({
  data,
  cart,
  customerId,
}) => {
  return (
    <>
      <SearchBar action={`/admin/customers/customer/${customerId}/cart/`} />
      <ProductList data={data} cart={cart} />
    </>
  );
};

export default AddProducts;
