import type { Quantities } from "../../ItemsList/ItemsList";

export const handleQuantityChange = (
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>,
  itemId: number,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { value } = e.target;
  console.log("🚀 ~ file: HandleQuantityChange.tsx:12 ~ value :", value);
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [itemId]: value,
  }));
};
