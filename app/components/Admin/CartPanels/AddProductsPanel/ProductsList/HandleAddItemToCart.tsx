import type { SubmitFunction } from "@remix-run/react";

export const handleAddItemToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  customerId: number,
  submit: SubmitFunction
) => {
  submit(
    { cartId, productId, quantity },
    {
      action: `/admin/customers/customer/${customerId}/cart/item/add`,
      method: "post",
    }
  );
};
