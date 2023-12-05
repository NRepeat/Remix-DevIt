import type { SubmitFunction } from "@remix-run/react";
import type { Quantities } from "../../ItemsList/ItemsList";

export const handleAddItemToCart = async (
  cartId: number,
  productId: number,
  quantities: Quantities,
  customerId: number,
  submit: SubmitFunction
) => {
  submit(
    { cartId, productId, quantities },
    {
      action: `/admin/customers/customer/${customerId}/cart/item/add`,
      method: "post",
    }
  );
};
