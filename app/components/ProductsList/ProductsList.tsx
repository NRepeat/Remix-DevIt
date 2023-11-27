import { FC } from "react";
import styles from "./styles.module.css";
import { Product, ProductResponse } from "~/types/types";
import ProductListItem from "./ProductListItem/ProductListItem";
import SortTypesList from "../Sort/SortTypesList";
import { StorePageProps } from "~/pages/StorePage/StorePage";

export type ProductListProps = {
  data: {
    products: ProductResponse
  };
}

const ProductsList: FC<ProductListProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <nav>
        {data.products.products.length ? (
          <ul className={styles.list}>
            {data.products.products.map((product: Product) => {
                return <li key={product.id}>
                  <ProductListItem product={product}  />
                </li>
            })}
          </ul>
        ) : (
          <div className={styles.noProducts}>
            <p>There are no products for this request</p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default ProductsList;
