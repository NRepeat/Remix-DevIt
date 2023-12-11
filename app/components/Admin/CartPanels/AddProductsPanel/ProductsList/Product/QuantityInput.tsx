import type { FC } from "react";
import { Input } from "~/components/Input/Input";
import type { QuantityInputProps } from "~/types/types";

export const QuantityCounter: FC<QuantityInputProps> = ({
  productId,
  quantities,
  handleQuantityChange,
  setQuantities,
}) => {
  return (
    <Input
      onChange={(e) => handleQuantityChange(setQuantities, productId, e)}
      type="number"
      placeholder="Quantity"
      value={quantities[productId] || ""}
    />
  );
};
