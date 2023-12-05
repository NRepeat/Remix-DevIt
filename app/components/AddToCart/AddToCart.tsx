import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { SerializeFrom } from "@remix-run/node";
import type { Product } from "@prisma/client";
import type { FC } from "react";
import type { loader } from "~/root";
import styles from "./styles.module.css";

export interface AddToCartProps {
  product: Product;
}

export const AddToCart: FC<SerializeFrom<AddToCartProps>> = ({ product }) => {
  const fetch = useFetcher()
  const data = useRouteLoaderData<typeof loader>("root"); //return the loader data by route id
  invariant(data, "Missing data");

  const cartItem = data.cart.find(
    (item) => item.productId === product.id.toString()
  );
  return (
    <fetch.Form
      method="post"
      action={`/products/product/${product.id}`}
      onSubmit={(event) => {
        if (cartItem && product.stock <= cartItem.quantity) {
          confirm("Out of stock.");
          event.preventDefault();
        }
      }}
    >
      <input name="productId" type="hidden" value={product.id} />
      <input name="productStock" type="hidden" value={product.stock} />

      <button className={styles.button} type="submit">
        {cartItem?.quantity ?? 0 < 0 ? "Add More" : "Add to cart"}
      </button>
    </fetch.Form>
  );
};
