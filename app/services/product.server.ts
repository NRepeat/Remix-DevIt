import { Category, Product } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export interface ProductData {
  products: Product[];
  category?: Category;
  totalPages?: number;
}
export interface SortField {
  rating: string;
  cheap: string;
  expensive: string;
  novelty: string;
}
const sortFieldMap: SortField = {
  rating: "rating",
  cheap: "price",
  expensive: "price",
  novelty: "createdAt",
};
const sortTypeMap: SortField = {
  rating: "desc",
  cheap: "asc",
  expensive: "desc",
  novelty: "asc",
};
export const getAllProducts = async (
  page: number,
  sortName: string
): Promise<ProductData> => {
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
    throw new Error(`Error during get all products ${error}`);
  }
};

export const getProduct = async (
  productId: number
): Promise<Product & { category: Category }> => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { category: true },
    });
    return product!;
  } catch (error) {
    throw new Error(`Error during get product: ${error}`);
  }
};

export const searchProduct = async (q: string, sortName: string): Promise<Product[]> => {
  const sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
  const sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: {
        [sortField]: sortType,
      },
    });

    return products;
  } catch (error) {
    throw new Error(`Error during product search: ${error}`);
  }
};

export const getAllProductCategories = async (): Promise<Category[]> => {
  try {
    return prisma.category.findMany();
  } catch (error) {
    throw new Error(`Error during categories search: ${error}`);
  }
};

export const getProductsByCategory = async (
  c: string,
  sortName: string
): Promise<Product[]> => {


  const sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
  const sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
  try {
    const products = await prisma.product.findMany({
      where: { category: { slug: c } },
      orderBy: {
        [sortField]: sortType,
      },
    });
    return products;
  } catch (error) {
    throw new Error(`Error during products by category search: ${error}`);
  }
};
