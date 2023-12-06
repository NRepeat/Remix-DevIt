import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import MapList from "./MapList";

export type ProductListProps = {
  productsData: ProductData;
};

const ProductsList: FC<SerializeFrom<ProductListProps>> = ({
  productsData,
}) => {
  return <MapList productsData={productsData} />;
};

export default ProductsList;
