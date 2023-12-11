import type { SubmitFunction } from "@remix-run/react";
import type { Quantities } from "./ItemsList";

export const handleChange = (
  itemId: number,
  e: React.ChangeEvent<HTMLInputElement>,
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>
) => {
  const { value } = e.target;
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [itemId]: value,
  }));
};

export const handleDelete = (
  title: string,
  id: number,
  customerId: number,
  submit: SubmitFunction
) => {
  const confirmDelete = confirm(
    `Are you sure  ,you want to delete ${title} in cart ? `
  );
  if (!confirmDelete) {
    return null;
  }
  submit(
    { cartItemId: id },
    {
      action: `/admin/customers/customer/${customerId}/cart/item/delete`,
      method: "post",
    }
  );
};
