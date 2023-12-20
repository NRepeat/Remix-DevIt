import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";
import ProductListItem from "./ProductListItem/ProductListItem";
import styles from "./styles.module.css";
export interface MapListProps {
  productsData: ProductData;
}

const MapList: FC<SerializeFrom<MapListProps>> = ({ productsData }) => {
  const chunkedProducts = chunkProductData(productsData, 6);
  return (
    <>
      {productsData.products.length ? (
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
          <p>There are no products for this request</p>
        </div>
      )}
    </>
  );
};

export default MapList;

const chunkProductData = (
  productData: SerializeFrom<ProductData>,
  chunkSize: number
) => {
  const chunks = [];

  for (let i = 0; i < productData.products.length; i += chunkSize) {
    chunks.push(productData.products.slice(i, i + chunkSize));
  }
  return chunks;
};
