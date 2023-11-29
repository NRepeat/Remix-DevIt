import { Category, Prisma, Product } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export interface ProductData {
  products: Product[];
  totalPages: number;
}
export interface SortField{
  rating: string;
  cheap: string;
  expensive: string;
  novelty: string;

}
export const getAllProducts = async (
  page: number,
  sortName: string,
): Promise<ProductData> => {
  const sortFieldMap:SortField = {
    rating: "rating",
    cheap: "price",
    expensive: "price",
    novelty: "createdAt",
  };
  const sortTypeMap:SortField = {
    rating: "desc",
    cheap: "asc",
    expensive: "desc",
    novelty: "asc",
  };
  const sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
  const sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
  const pageSize: number = 10;
  const skip = (page - 1) * pageSize;
  try {
    const [products, totalProductsCount] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: {
          [sortField]: sortType,
        },
        skip,
        take: pageSize,
      }),
      prisma.product.count(),
    ]);
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    return { products, totalPages };
  } catch (error) {
    throw new Error(`Error during get all products ${error}`)
  }

 
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

export const searchProduct = async (q: string): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
  });

  return products;
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
