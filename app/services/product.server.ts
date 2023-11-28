import { Category, Product } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";
import { getAllProductCategories, getProducts } from "./dummy.server";


export const postProductsData = async () => {
  try {
    const dummyData = await getProducts();
    const categories = await getAllProductCategories()
    console.log("🚀 ~ file: product.server.ts:10 ~ postProductsData ~ categories :", categories )
    await Promise.all(categories.map(async (category) => {
      await prisma.category.create({ data: category });
    }));
    // const createdProducts = await prisma.product.createMany({data:dummyData.products})
// await prisma.category.createMany({data:categories})
    console.log('Products created:', );
  } catch (error) {
    console.error('Error posting products data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};

export const getProduct = async (productId: string): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/${productId}`).then((res) =>
    res.json()
  );
};

export const searchProduct = async (q: string |null): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/search?q=${q}`).then((res) =>
    res.json()
  );
};
// export const getAllProductCategories = async (): Promise<Category> => {
//   return fetch(`https://dummyjson.com/products/categories`).then((res) =>
//     res.json()
//   );
// };

export const getProductsByCategory = async (c: string |null): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/category/${c}`).then((res) =>
    res.json()
  );
};

export const getLimitProducts= async (limit: number |null,skip: number |null,...params:[string] ): Promise<Product> => {
  return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select${params.join(",")}`).then((res) =>
    res.json()
  );
};
