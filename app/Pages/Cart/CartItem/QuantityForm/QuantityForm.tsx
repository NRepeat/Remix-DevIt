import { withZod } from "@remix-validated-form/with-zod";
import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import type { CartItemProps } from "../CartItem";

const QuantityValidator = withZod(
  z.object({
    quantity: z.coerce.number(),
  })
);

const QuantityForm: FC<CartItemProps> = ({ item }) => {
  return (
    <div>
      <ValidatedForm
        validator={QuantityValidator}
        defaultValues={{ quantity: item.quantity }}
      >
        <FormInput name="quantity" type="number" label="Quantity" />
      </ValidatedForm>
    </div>
  );
};

export default QuantityForm;
