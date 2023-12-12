import type { SubmitFunction } from "@remix-run/react";
import type { Quantities } from "~/components/Admin/CartPanels/ItemsList/ItemsList";
import type { ProductData } from "~/services/product.server";

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
};

export type ProductResponse = {
  limit: number;
  skip: number;
  total: number;
  products: DummyProduct[];
};
export interface StorePageProps {
  data: {
    products: ProductData;
    page: number;
    cart: {
      productId: string;
      quantity: number;
    }[];
    categories: {
      id: number;
      slug: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
}
type HandleAddItemToCartFunction = (
  cartId: number,
  productId: number,
  quantities: Quantities,
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
  customerId: number;
}
export interface QuantityInputProps {
  productId: number;
  productStock: number;
  quantities: Quantities;
  handleQuantityChange: HandleQuantityChangeFunction;
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>;
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
