import type { Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import clsx from "clsx";
import React from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import styles from "./styles.module.css";

export interface ButtonContainerProps {
  product: Product;
}
export const validationProductDelete = withZod(
  z.object({
    productId: z.coerce.number(),
  })
);

const ButtonContainer: React.FC<SerializeFrom<ButtonContainerProps>> = ({
  product,
}) => {
  return (
    <div className={styles.container}>
      <Link
        className={clsx(styles.link, styles.edit)}
        to={`/admin/products/product/${product.id}/edit`}
      >
        Edit
      </Link>
      <ValidatedForm validator={validationProductDelete} method="delete">
        <FormInput name="productId" type="hidden" value={product.id} />
        <SubmitButton className={clsx(styles.button, styles.delete)}>
          Delete
        </SubmitButton>
      </ValidatedForm>
    </div>
  );
};

export default ButtonContainer;
