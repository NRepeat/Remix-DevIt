import type { SerializeFrom } from "@remix-run/node";
import { type FC } from "react";
import type { CartWithCartItems } from "../SingleCart";
import List from "./List";

export type CartItemsListProps = {
  cart: SerializeFrom<CartWithCartItems>;
};

const CartItemsList: FC<SerializeFrom<CartItemsListProps>> = ({ cart }) => {
  return <List cart={cart} />;
};

export default CartItemsList;
