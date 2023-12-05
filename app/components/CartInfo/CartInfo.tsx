import styles from "./styles.module.css";
import FaCart from "./FaCart";
import { Link, useMatches, useRouteLoaderData } from "@remix-run/react";
import type { FC } from "react";
import invariant from "tiny-invariant";
import type { loader } from "~/routes/products._index";


export const CartIcon: FC = () => {
  const data = useRouteLoaderData<typeof loader>("root"); //return the loader data by route id
  invariant(data, "Missing data");

  const quantity = data.cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  return (
    <Link className={styles.cart} to={"/cart"}>
      <FaCart />
      {quantity !== 0 && <p className={styles.quantity}> {quantity}</p>}
    </Link>
  );
};
