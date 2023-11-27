import { FC } from "react";
import styles from "./styles.module.css";
import { Product } from "~/types/types";
import ProductListItem from "./ProductListItem/ProductListItem";
import SortTypesList from "../Sort/SortTypesList";

export interface ProductListProps {
  products: Product[];
}


const ProductsList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sortOptions}>
        <SortTypesList />
      </div>
      <nav>
        {products.length ? (
          <ul className={styles.list}>
            {products.map((product: Product) => (
              <li key={product.id}>
                <ProductListItem product={product} />
              </li>
            ))}
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
