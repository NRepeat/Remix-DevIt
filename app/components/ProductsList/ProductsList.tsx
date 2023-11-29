import { FC } from "react";
import styles from "./styles.module.css";
import ProductListItem from "./ProductListItem/ProductListItem";
import { Product } from "@prisma/client";
import SortTypesList from "../Sort/SortTypesList";

export type ProductListProps = {
  data: {
    products: Product[];
  };
};

const ProductsList: FC<ProductListProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
      <SortTypesList/>

        {data.products.length ? (
          <ul className={styles.list}>
            {data.products.map((product: Product) => {
              return  (
                <li className={styles.li} key={product.id}>
                  <ProductListItem product={product} />
                </li>
              );
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
