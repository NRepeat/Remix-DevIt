import { Link, useRouteLoaderData } from "@remix-run/react";
import type { FC } from "react";
import type { loader } from "~/root";
import { createBadRequest } from "~/services/httpErrors.server";
import FaCart from "./FaCart";
import styles from "./styles.module.css";

export const CartIcon: FC = () => {
  const data = useRouteLoaderData<typeof loader>("root"); //return the loader data by route id
  if (!data) {
    throw createBadRequest();
  }

  const cart = data.cart ?? 0;

  const quantity = cart.reduce((accumulator: number, item) => {
    return accumulator + item.quantity;
  }, 0);
  return (
    <Link className={styles.cart} to={"/cart"}>
      <FaCart />
      {<p className={styles.quantity}> {quantity}</p>}
    </Link>
  );
};
