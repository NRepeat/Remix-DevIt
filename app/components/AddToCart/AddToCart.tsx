import { Form } from "@remix-run/react";
import styles from "./styles.module.css";
import { Product } from "~/types/types";
import { FC } from "react";

export interface AddToCartProps {
  product: Product;
  quantity:number
}

export const AddToCart: FC<AddToCartProps> = ({ product ,quantity}) => {
  return (
    <Form method="post">
      <input name="productId" type="hidden" value={product.id} />
      <button className={styles.button} type="submit">{quantity >0 ? "Add More" : "Add to cart"}</button>
    </Form>
  );
};
