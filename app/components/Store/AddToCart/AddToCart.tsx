import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Product } from "@prisma/client";
import type { FC } from "react";
import type { loader } from "~/root";
import type { SingleProduct } from "../Product/ProductInformation/ProductInformation";
import styles from "./styles.module.css";

export interface AddToCartProps {
  product: Product;
}

export const AddToCart: FC<SingleProduct> = ({ product }) => {
  const fetch = useFetcher();
  const data = useRouteLoaderData<typeof loader>("root"); //return the loader data by route id
  invariant(data, "Missing data");

  const cartItem = data.cart.find((item) => item.productId === product.id);
  return (
    <fetch.Form
      method="post"
      action={`/product/${product.slug}`}
      onSubmit={(event) => {
        if (cartItem && product.stock <= cartItem.quantity) {
          confirm("Out of stock.");
          event.preventDefault();
        }
      }}
    >
      <input name="slug" type="hidden" value={product.slug} />

      <button className={styles.button} type="submit">
        {cartItem?.quantity && cartItem?.quantity < 0
          ? "Add More"
          : "Add to cart"}
      </button>
    </fetch.Form>
  );
};
