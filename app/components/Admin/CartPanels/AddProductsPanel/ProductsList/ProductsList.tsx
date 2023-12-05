import type { SerializeFrom } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import Pagination from "~/components/Pagination/Pagination";
import type { Quantities } from "../../ItemsList/ItemsList";
import type { AddProductProps } from "../AddProductsPanel";
import { handleAddItemToCart } from "./HandleAddItemToCart";
import { handleQuantityChange } from "./HandleQuantityChange";
import ProductRow from "./Product/Product";
import styles from "./styles.module.css";

const ProductsList: FC<SerializeFrom<AddProductProps>> = ({ data, cart }) => {
  const [quantities, setQuantities] = useState<Quantities>({});
  const submit = useSubmit();

  return (
    <div className={styles.container}>
      <Pagination
        admin={true}
        currentPage={data.page!}
        totalPages={data.totalPages!}
      />
      <ul className={styles.list}>
        {data.products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            cart={cart}
            handleAddItemToCart={handleAddItemToCart}
            handleQuantityChange={handleQuantityChange}
            setQuantities={setQuantities}
            quantities={quantities}
            submit={submit}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
