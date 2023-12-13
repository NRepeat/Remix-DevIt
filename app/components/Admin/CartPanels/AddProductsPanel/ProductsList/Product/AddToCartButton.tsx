import type { FC } from "react";
import type { AddItemToCartButtonProps } from "~/types/types";
export const AddToCartButton: FC<AddItemToCartButtonProps> = ({
  cart,
  product,
  customerId,
}) => {
  if (!customerId) {
    throw new Response("Customer id not found");
  }

  return (
    <></>
    // <ValidatedForm
    //   validator={addProductToCartSchema}
    //   className={styles.form}
    //   method="post"
    //   action={`/admin/customers/customer/${customerId}/cart/item/add`}
    // >
    //   <FormInput label="quantity" type="number" name="quantity" />
    //   <FormInput label="" type="hidden" name="productId" value={product.id} />
    //   <Input type="hidden" value={product.id} name="productId" />
    //   <Input type="hidden" value={product.externalId!} name="externalId" />
    //   <Input type="hidden" value={cart.id} name="cartId" />
    //   <Button type="submit">Add</Button>
    // </ValidatedForm>
  );
};
