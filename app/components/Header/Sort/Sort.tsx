import { FC } from "react";
import { ProductListProps } from "~/components/ProductsList/ProductsList";
import { Product } from "~/types/types";

export interface SortedProductsListProps {
  order: string;
  ProductsList: FC<ProductListProps>;
  products: Product[];
}

const SortedProductsList = ({ order, ProductsList, products }: SortedProductsListProps) => {
  const sortedProducts = [...products].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );

  return <ProductsList products={sortedProducts} />;
};


export default SortedProductsList;
