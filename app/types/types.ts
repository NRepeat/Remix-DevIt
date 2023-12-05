import type { SubmitFunction } from "@remix-run/react";
import type { Quantities } from "~/components/Admin/CartPanels/ItemsList/ItemsList";

export type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  message: string;
};

export type ProductResponse = {
  limit: number;
  skip: number;
  total: number;
  products: DummyProduct[];
};

type HandleAddItemToCartFunction = (
  cartId: number,
  productId: number,
  quantity: number,
  customerId: number,
  submit: SubmitFunction
) => void;

type HandleQuantityChangeFunction = (
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>,
  productId: number,
  e: React.ChangeEvent<HTMLInputElement>
) => void;

export interface handleAddToCartProps {
  cartId: number;
  productId: number;
  quantity: number;
  customerId: number;
  submit: SubmitFunction;
}
export type CartProduct = {
  id: number;
  externalId: number | null;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  categoryId: number;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};
export type CartT = {
  id: number;
  customerId: number | null;
  createdAt: string;
  updatedAt: string;
};
export interface AddItemToCartButtonProps {
  cart: CartT;
  product: CartProduct;
  quantities: Quantities;
  submit: SubmitFunction;
  handleAddItemToCart: HandleAddItemToCartFunction;
}
export interface QuantityInputProps {
  productId: number;
  quantities: Quantities;
  handleQuantityChange: HandleQuantityChangeFunction;
}
export interface ProductProps {
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>;
  product: CartProduct;
  cart: CartT;
  quantities: Quantities;
  submit: SubmitFunction;
  handleAddItemToCart: HandleAddItemToCartFunction;
  handleQuantityChange: HandleQuantityChangeFunction;
}
