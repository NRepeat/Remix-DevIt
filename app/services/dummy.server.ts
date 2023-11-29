import { ProductResponse } from "~/types/types";

export const fetchLimitedData = async (limit:number,skip:number): Promise<ProductResponse> => {
  return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then((res) => res.json());
};
