import type { FC } from "react";
import { Button } from "~/components/Button/Button";
import type { AddItemToCartButtonProps } from "~/types/types";
import styles from "../styles.module.css";
export const AddToCartButton: FC<AddItemToCartButtonProps> = ({
  cart,
  product,
  quantities,
  submit,
  handleAddItemToCart,
  customerId,
}) => {
  if (!customerId) {
    throw new Response("Customer id not found");
  }
  return (
    <Button
      className={styles.add}
      onClick={() =>
        handleAddItemToCart(cart.id, product.externalId!, product.id, quantities, customerId, submit)
      }
    >
      Add to cart
    </Button>
  );
};
