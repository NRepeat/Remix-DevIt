import styles from "./styles.module.css";
import FaCart from "./FaCart";
import { Link, useRouteLoaderData } from "@remix-run/react";
import { FC } from "react";
import type { loader } from "~/root";
import invariant from "tiny-invariant";


export const CartIcon: FC = () => {
  const data = useRouteLoaderData<typeof loader>("root"); //return the loader data by route id
  invariant(data, "Missing data");

  const quantity = data.cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  return (
    <button className={styles.cart}>
      <Link to={"/cart"}>
        <FaCart />
        {quantity && <span className={styles.quantity}> {quantity}</span>}
      </Link>
    </button>
  );
};
