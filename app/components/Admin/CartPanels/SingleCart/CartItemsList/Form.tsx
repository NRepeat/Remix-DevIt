import type { CartItem, Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/Ui/Form/FormControl/ContolledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import styles from "./styles.module.css";
export const validationCart = withZod(
  z.object({
    price: z.coerce.number(),
    quantity: z.coerce.number(),
    rating: z.coerce.number().multipleOf(0.01),
    productId: z.coerce.number(),
    itemId: z.coerce.number(),
  })
);
export const validationCartDelete = withZod(
  z.object({
    itemId: z.coerce.number(),
  })
);

type FormProps = {
  item: SerializeFrom<CartItem & { product: Product }>;
};

const FormCard: FC<FormProps> = ({ item }) => {
  return (
    <>
      <ValidatedForm
        defaultValues={{
          price: item.product.price,
          quantity: item.quantity,
          rating: item.product.rating,
          productId: item.product.id,
          itemId: item.id,
        }}
        className={styles.form}
        validator={validationCart}
        method="post"
      >
        <div className={styles.inputs}>
          <FormInput name="price" placeholder="$" type="number" />{" "}
          <FormInput name="quantity" placeholder="#" type="number" />
          <FormInput type="text" label=" " placeholder="mmr" name="rating" />
          <FormInput name="productId" type="hidden" value={item.product.id} />
          <FormInput name="itemId" value={item.id} type="hidden" />
        </div>
        <SubmitButton>Save</SubmitButton>
      </ValidatedForm>
      <ValidatedForm validator={validationCartDelete} method="delete">
        <FormInput name="itemId" value={item.id} type="hidden" />
        <SubmitButton className={styles.delete}>Delete</SubmitButton>
      </ValidatedForm>
    </>
  );
};

export default FormCard;
