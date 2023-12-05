import { SerializeFrom } from "@remix-run/node";
import { FC, useState } from "react";
import styles from "./styles.module.css";
import { AddProductProps } from "../AddProducts";
import { Quantities } from "../../ItemsList/ItemsList";
import {
  useSubmit,
} from "@remix-run/react";
import Pagination from "~/components/Pagination/Pagination";
import ProductRow from "./Product";
import { handleQuantityChange } from "./HandleQuantityChange";
import { handleAddItemToCart } from "./HandleAddItemToCart";

const ProductsList: FC<SerializeFrom<AddProductProps>> = ({ data, cart }) => {
 
  const [quantities, setQuantities] = useState<Quantities>({});
  const submit = useSubmit();


  return (
    <div className={styles.container}>
      <Pagination admin={true} currentPage={data.page!} totalPages={data.totalPages!} />
      <ul className={styles.list}>
        {data.products.map((product) => (
        <ProductRow key={product.id} product={product}  cart={cart} handleAddItemToCart={handleAddItemToCart} handleQuantityChange={handleQuantityChange} setQuantities={setQuantities} quantities={quantities} submit={submit}/>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
