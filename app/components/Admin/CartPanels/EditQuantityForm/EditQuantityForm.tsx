import React from "react";
import FormM from "~/components/Form/FormM";
import { Input } from "~/components/Input/Input";
import type { Quantities } from "../ItemsList/ItemsList";
import styles from "./styles.module.css";
export interface EditQuantityFormProps {
  item: {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  };
  quantities: Quantities;
  customerId: number;
  handleChange: (
    itemId: number,
    e: React.ChangeEvent<HTMLInputElement>,
    setQuantities: React.Dispatch<React.SetStateAction<Quantities>>
  ) => void;
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>;
}

const EditQuantityForm: React.FC<EditQuantityFormProps> = ({
  item,
  quantities,
  customerId,
  handleChange,
  setQuantities,
}) => {
  return (
    <>
      <p className={styles.quantity}>Edit quantity</p>

      <Input
        onChange={(e) => handleChange(item.id, e, setQuantities)}
        type="text"
        value={quantities[item.id] || item.quantity.toString()}
      />
      <FormM
        isFetcher={false}
        action={`/admin/customers/customer/${customerId}/cart/item/edit/quantity`}
        method="post"
        className={styles.form}
      >
        <Input type="hidden" name="cartItemId" value={item.id} />
        <Input
          type="hidden"
          name="quantity"
          value={quantities[item.id] || item.quantity}
        />
        <button className={styles.save} type="submit">
          Save
        </button>
      </FormM>
    </>
  );
};

export default EditQuantityForm;
