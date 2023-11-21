import styles from "./styles.module.css";
import FaCart from "./FaCart";
import { Link, useRouteLoaderData } from "@remix-run/react";
import { FC } from "react";
import type { loader } from "~/root";
import invariant from "tiny-invariant";






export const CartIcon:FC= () => {
const data = useRouteLoaderData<typeof loader>("root") 
invariant(data, "Missing data")
console.log("🚀 ~ file: CartInfo.tsx:23 ~ data:", data)

  const quantity = data.cart.reduce((accumulator, item) => {
   
      return accumulator + item.quantity;
  
  
  }, 0);

  return (
    <Link to={"/cart"}>
      <button className={styles.cart}>
        <FaCart />
        {quantity && <span className={styles.quantity}> {quantity}</span>}
      </button>
    </Link>
  );
}

