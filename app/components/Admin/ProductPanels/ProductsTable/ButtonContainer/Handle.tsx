import type { SubmitFunction } from "@remix-run/react";

type HandleArgs = {
  id: number;
  submit: SubmitFunction;
};

export const handleSubmit = ({ id, submit }: HandleArgs) => {
  const isConfirmDeleteProduct = confirm(`Confirm delete product ${id}`);
  if (!isConfirmDeleteProduct) {
    return;
  }
  submit(
    { id },
    {
      method: "delete",
      action: `/admin/products/product/delete`,
      navigate: false,
    }
  );
};

export const handleCartCreate = ({ id, submit }: HandleArgs) => {
  submit(
    {},
    {
      action: `/admin/customers/customer/${id}/cart/create`,
      method: "post",
      navigate: false,
    }
  );
};
