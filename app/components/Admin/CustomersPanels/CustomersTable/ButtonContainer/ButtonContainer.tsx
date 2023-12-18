import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import clsx from "clsx";
import React from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/Ui/Form/FormControl/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import styles from "./styles.module.css";

export interface ButtonContainerProps {
  customer: CustomerWithoutPassword;
}
export const validationCustomerDelete = withZod(
  z.object({
    customerId: z.coerce.number(),
  })
);
const ButtonContainer: React.FC<SerializeFrom<ButtonContainerProps>> = ({
  customer,
}) => {
  return (
    <div className={styles.container}>
      <Link
        className={clsx(styles.button, styles.edit)}
        to={`customer/${customer.id}/edit`}
      >
        <p>Edit</p>
      </Link>
      <ValidatedForm
        className={clsx(styles.form)}
        method="delete"
        validator={validationCustomerDelete}
      >
        <FormInput name="customerId" type="hidden" value={customer.id} />
        <SubmitButton className={clsx(styles.button, styles.delete)}>
          Delete
        </SubmitButton>
      </ValidatedForm>
    </div>
  );
};

export default ButtonContainer;
