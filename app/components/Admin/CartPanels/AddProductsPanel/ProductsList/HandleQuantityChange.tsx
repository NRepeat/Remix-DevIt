import { Quantities } from "../../ItemsList/ItemsList";

export const handleQuantityChange= (
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>,
  itemId: number,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { value } = e.target;
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [itemId]: value,
  }));
};