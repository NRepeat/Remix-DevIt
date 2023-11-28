import { Product, ProductCategoriesResponse, ProductResponse } from "~/types/types";

export const getProducts = async (): Promise<Product> => {
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
export const getAllProductCategories = async (): Promise<ProductCategoriesResponse> => {
  return fetch(`https://dummyjson.com/products/categories`).then((res) =>
    res.json()
  );
};

export const getProductsByCategory = async (c: string |null): Promise<ProductResponse> => {
  return fetch(`https://dummyjson.com/products/category/${c}`).then((res) =>
    res.json()
  );
};

export const getLimitProducts= async (limit: number |null,skip: number |null,...params:[string] ): Promise<ProductResponse> => {
  return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select${params.join(",")}`).then((res) =>
    res.json()
  );
};
