import type { Cart, Category, Product } from "@prisma/client";
import type { SubmitFunction } from "@remix-run/react";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import type { Member } from "~/services/member.server";
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
    categories: Category[];
    user: CustomerWithoutPassword | Member | null;
  };
}

export interface handleAddToCartProps {
  cartId: number;
  productId: number;
  quantity: number;
  customerId: number;
  submit: SubmitFunction;
}
export type CartProduct = Product;

export interface AddItemToCartButtonProps {
  cart: Cart;
  product: CartProduct;
  customerId: number;
}

export interface ProductProps {
  product: CartProduct;
}
