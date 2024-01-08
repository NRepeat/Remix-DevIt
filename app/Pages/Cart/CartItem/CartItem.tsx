import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { CartItemWithProduct } from "~/services/cart.server";
import Information from "./Information/Information";
import QuantityForm from "./QuantityForm/QuantityForm";

export type CartItemProps = {
  item: SerializeFrom<CartItemWithProduct>;
};

const CartItem: FC<CartItemProps> = ({ item }) => {
  return (
    <div>
      <Information item={item} />
      <QuantityForm item={item} />
    </div>
  );
};

export default CartItem;
