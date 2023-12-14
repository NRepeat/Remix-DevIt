import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/FormInput";
import type { AddItemToCartButtonProps } from "~/types/types";
import { addProductToCartSchema } from "~/utils/productValidation";
import styles from "../styles.module.css";
export const AddToCartButton: FC<AddItemToCartButtonProps> = ({
  cart,
  product,
  customerId,
}) => {
  if (!customerId) {
    throw new Response("Customer id not found");
  }

  return (
    <ValidatedForm
      validator={addProductToCartSchema}
      className={styles.form}
      method="post"
      action={`/admin/customers/customer/${customerId}/cart/item/add`}
    >
      <FormInput label="quantity" type="number" name="quantity" />
      <FormInput label="" type="hidden" name="productId" value={product.id} />
      <FormInput
        label=""
        type="hidden"
        name="externalId"
        value={product.externalId!}
      />
      <FormInput label="" type="hidden" name="cartId" value={cart.id} />
      <Button type="submit">Add</Button>
    </ValidatedForm>
  );
};
