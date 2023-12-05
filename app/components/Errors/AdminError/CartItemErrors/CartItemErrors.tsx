import { type ErrorResponse } from "@remix-run/node";
import type { FC } from "react";
import React from "react";
import styles from "./styles.module.css"


export interface CartItemErrorsProps {
  error: ErrorResponse;
}

const CartItemErrors: FC<CartItemErrorsProps> = ({ error }) => {
  return (
    <div className={styles.error}>
      <h1>Error status</h1>
      <p>{error.status}</p>
      <h2>Error:</h2>
      <p>{error.statusText}</p>
    </div>
  );
};

export default CartItemErrors;
