import { Product, ProductResponse } from "~/types/types";

export const getProducts = async (): Promise<ProductResponse> => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getProduct = async (productId:string): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/${productId}`).then((res) =>
    res.json()
  );
};
