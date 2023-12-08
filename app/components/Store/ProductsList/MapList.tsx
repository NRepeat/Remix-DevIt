import type { Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import ProductListItem from "./ProductListItem/ProductListItem";
import styles from "./styles.module.css";

export interface MapListProps {
  productsData: ProductData;
}

const MapList: FC<SerializeFrom<MapListProps>> = ({ productsData }) => {
  return (
    <>
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
    </>
  );
};

export default MapList;
