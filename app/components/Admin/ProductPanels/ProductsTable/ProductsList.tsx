import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import Table from "./Table";
const ProductsList: FC<SerializeFrom<ProductData>> = ({ products }) => {
  return <Table products={products} />;
};

export default ProductsList;
