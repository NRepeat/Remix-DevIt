import type { FC } from "react";
import styles from "./styles.module.css";
import ProductListItem from "./ProductListItem/ProductListItem";
import type { Product } from "@prisma/client";
import { Category } from "@prisma/client";
import SortTypesList from "../Sort/SortTypesList";
import type { SerializeFrom } from "@remix-run/node";
import type { ProductData } from "~/services/product.server";

export type ProductListProps = {
  productsData: ProductData 

};

const ProductsList: FC<SerializeFrom<ProductListProps>> = ({ productsData }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={styles.sort}>
          <SortTypesList />
        </div>
        {productsData.products.length ? (
          <ul className={styles.list}>
            {productsData.products.map((product: SerializeFrom<Product>) => {
              return (
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
