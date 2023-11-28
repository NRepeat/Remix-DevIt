import { Category, Product } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";
import { getProducts } from "./dummy.server";

export const postProductsData = async (): Promise<Product[] | undefined> => {
  try {
    const dummyData = await getProducts();
    const createdProducts = await Promise.all(
      dummyData.products.map(async (product) => {
        const productdb = await prisma.product.findFirst({
          where: { title: product.title },
        });

        if (!productdb) {
          const createdProduct = await prisma.product.create({
            data: {
              brand: product.brand,
              description: product.description,
              discountPercentage: product.discountPercentage,
              price: product.price,
              rating: product.rating,
              stock: product.stock,
              thumbnail: product.thumbnail,
              title: product.title,
              images: product.images,
              category: {
                connectOrCreate: {
                  where: { slug: product.category },
                  create: { slug: product.category },
                },
              },
            },
          });

          return createdProduct;
        }
      })
    );
    return createdProducts as Product[];
  } catch (error) {
    console.error("Error posting products data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllDbProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany({ include: { category: true } });
};

export const getDbProduct = async (
  productId: number
): Promise<Product & { category: Category }> => {
  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: { category: true },
  });
  return product!;
};

export const searchProduct = async (q: string | null): Promise<Product> => {
  return fetch(`https://dummyjson.com/products/search?q=${q}`).then((res) =>
    res.json()
  );
};
export const getAllDbProductCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany();
};

export const getDbProductsByCategory = async (
  c: string
): Promise<Category & { products: Product[] }> => {
  const products = await prisma.category.findUnique({
    where: { slug: c },
    include: { products: true },
  });
  return products!;
};

export const getLimitProducts = async (
  limit: number | null,
  skip: number | null,
  ...params: [string]
): Promise<Product> => {
  return fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select${params.join(
      ","
    )}`
  ).then((res) => res.json());
};
