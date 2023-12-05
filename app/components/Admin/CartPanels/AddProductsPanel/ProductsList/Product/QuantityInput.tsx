import type { FC } from "react";
import type { QuantityInputProps } from "~/types/types";

export const QuantityCounter: FC<QuantityInputProps> = ({
  productId,
  quantities,
  handleQuantityChange,
  setQuantities,
}) => {
  return (
    <input
      onChange={(e) => handleQuantityChange(setQuantities, productId, e)}
      type="number"
      placeholder="Quantity"
      value={quantities[productId] || ""}
    />
  );
};
