import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import { Button } from "~/components/Button/Button";
import FormM from "~/components/Form/FormM";
import { Input } from "~/components/Input/Input";
import type { AddItemToCartButtonProps } from "~/types/types";
import { quantitySchema } from "~/utils/productValidation";
import styles from "../styles.module.css";
export const AddToCartButton: FC<AddItemToCartButtonProps> = ({
  cart,
  product,
  customerId,
}) => {
  if (!customerId) {
    throw new Response("Customer id not found");
  }
  const [quantity, setQuantity] = useState(0);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = quantitySchema.parse(parseInt(e.target.value));
    setQuantity(quantity);
  };
  return (
    <FormM
      isFetcher={true}
      className={styles.form}
      method="post"
      action={`/admin/customers/customer/${customerId}/cart/item/add`}
    >
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        name="quantity"
      />
      <Input type="hidden" value={product.id} name="productId" />
      <Input type="hidden" value={product.externalId!} name="externalId" />
      <Input type="hidden" value={cart.id} name="cartId" />
      <Button type="submit">Add</Button>
    </FormM>
  );
};
