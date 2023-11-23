import { FC } from "react";
import styles from "./styles.module.css";
import { Product } from "~/types/types";
import ProductListItem from "./ProductListItem/ProductListItem";
import Filter from "~/components/Sort/Sort"
const ProductsList: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      <Filter  products ={products}/>
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
