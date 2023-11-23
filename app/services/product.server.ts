import { Product, ProductCatgoriesResponse, ProductResponse } from "~/types/types";

export const getProducts = async (): Promise<ProductResponse> => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getProduct = async (productId: string): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/${productId}`).then((res) =>
    res.json()
  );
};

export const searchProduct = async (q: string |null): Promise<ProductResponse> => {
  return fetch(`https://dummyjson.com/products/search?q=${q}`).then((res) =>
    res.json()
  );
};
export const getAllProductCategories = async (): Promise<ProductCatgoriesResponse> => {
  return fetch(`https://dummyjson.com/products/categories`).then((res) =>
    res.json()
  );
};

export const searchProductByCategories = async (c: string |null): Promise<ProductResponse> => {
  return fetch(`https://dummyjson.com/products/category/${c}`).then((res) =>
    res.json()
  );
};
