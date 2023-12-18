import type { SubmitFunction } from "@remix-run/react";

type HandleArgs = {
  id: number;
  submit: SubmitFunction;
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
