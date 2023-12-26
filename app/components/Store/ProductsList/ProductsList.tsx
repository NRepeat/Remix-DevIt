import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import { chunkProductData } from "~/utils/data";
import ProductListItem from "./ProductListItem/ProductListItem";
import styles from "./styles.module.css";
export interface MapListProps {
  productsData: ProductData;
}

const MapList: FC<SerializeFrom<MapListProps>> = ({ productsData }) => {
  const chunkedProducts = chunkProductData(productsData, 10);
  return (
    <>
      {productsData.products.length >= 1 ? (
        <ul className={styles.list}>
          {chunkedProducts.map((chunk, index) => (
            <li className={styles.li} key={index}>
              {chunk.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noProducts}>
          <p>There are no products for this search request</p>
        </div>
      )}
    </>
  );
};

export default MapList;
