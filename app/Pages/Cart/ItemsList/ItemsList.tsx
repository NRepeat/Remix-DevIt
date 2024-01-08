import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { CartWithItems } from "~/services/cart.server";
import CartItem from "../CartItem/CartItem";

type CartItemList = {
  items: SerializeFrom<CartWithItems>;
};

const ItemsList: FC<CartItemList> = ({ items }) => {
  return (
    <div>
      {items.cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsList;
