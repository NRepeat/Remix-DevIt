import type { SubmitFunction } from "@remix-run/react";

type HandleArgs = {
  id: number;
  submit: SubmitFunction;
};

export const handleSubmit = ({ id, submit }: HandleArgs) => {
  const isConfirmDeleteCustomer = confirm(`Confirm delete customer ${id}`);
  if (!isConfirmDeleteCustomer) {
    return;
  }
  submit(
    { id },
    {
      method: "post",
      action: `/admin/customers/customer/delete`,
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
