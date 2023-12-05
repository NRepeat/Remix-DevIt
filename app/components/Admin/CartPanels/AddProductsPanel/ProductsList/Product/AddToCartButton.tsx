import type { FC } from "react";
import type { AddItemToCartButtonProps } from "~/types/types";

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
    <button
      onClick={() =>
        handleAddItemToCart(cart.id, product.id, quantities, customerId, submit)
      }
    >
      Add to cart
    </button>
  );
};
