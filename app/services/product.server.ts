import type { Category, Product } from "@prisma/client";
import type { ProductCreateData } from "~/types/types";
import { formatString } from "~/utils/formatting.server";
import { calculatePaginationSize } from "~/utils/pagination.server";
import { prisma } from "~/utils/prisma.server";
import {
  ProductCreateError,
  ProductNotFoundError,
  ProductUpdateError,
} from "./productError.server";

export interface ProductData {
  products: ({
    category?: Category;
  } & Product)[];
  totalPages?: number;
  page?: number;
}
type updateProductArgs = {
  id: number;
  newData: {
    img?: string;
    title?: string;
    description?: string;
    rating?: number;
    stock?: number;
    price?: number;
  };
};
type updateProductCategoryArgs = {
  id: number;
  category: string;
};
type searchProductArgs = {
  search?: string;
  sortName?: string | null;
};
type getAllProductsArgs = {
  page: number;
  sortName?: string | null;
};
type getProductArgs = {
  id?: number;
  slug?: string;
  externalId?: number;
};
export interface SortField {
  rating: string;
  cheap: string;
  expensive: string;
  novelty: string;
}
type getProductsByCategoryArgs = {
  category: string;
  page?: number;
  sortName?: string | null;
};
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

export type CreateProductArgs = {
  data: ProductCreateData;
};
let sortField = "price";
let sortType = "desc";
export const createProduct = async ({ data }: CreateProductArgs) => {
  try {
    const product = await prisma.product.create({
      data: {
        brand: data.brand,
        description: data.description,
        discountPercentage: data.discountPercentage,
        price: data.price,
        rating: data.rating,
        stock: data.stock,
        thumbnail: data.thumbnail,
        title: data.title,
        images: data.images.split(","),
        category: {
          connectOrCreate: {
            where: { slug: data.category },
            create: {
              slug: data.category,
              name: formatString(data.category),
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    throw new ProductCreateError({
      cause: "Error during product creation",
      product: JSON.stringify(data),
    });
  }
};

export const getAllProducts = async (
  data: getAllProductsArgs
): Promise<ProductData> => {
  try {
    const { page, sortName } = data;
    const { skip, take } = calculatePaginationSize({ page });

    if (sortName) {
      sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
      sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
    }
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: {
        [sortField]: sortType,
      },
      skip,
      take,
    });

    const totalProductsCount = await prisma.product.count();
    const totalPages = Math.ceil(totalProductsCount / take);

    return { products, totalPages, page };
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductNotFoundError({
        method: "getAllProducts",
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const getProduct = async (
  data: getProductArgs
): Promise<Product & { category: Category }> => {
  try {
    const { externalId, id, slug } = data;
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug }, { externalId }],
      },
      include: { category: true },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductNotFoundError({
        method: "getProduct",
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const searchProduct = async (
  data: searchProductArgs
): Promise<ProductData> => {
  try {
    const { search, sortName } = data;
    if (sortName) {
      sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
      sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
    }
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
      include: { category: true },
      orderBy: {
        [sortField]: sortType,
      },
    });
    return { products };
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductNotFoundError({
        method: "searchProduct",
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const getAllProductCategories = async (): Promise<Category[]> => {
  try {
    const category = prisma.category.findMany();
    return category;
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductNotFoundError({
        method: "getAllProductCategories",
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const getProductsByCategory = async (
  data: getProductsByCategoryArgs
): Promise<ProductData> => {
  const { category, page, sortName } = data;
  const { skip, take } = calculatePaginationSize({ page });
  if (sortName) {
    sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
    sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
  }
  try {
    const products = await prisma.product.findMany({
      where: { category: { slug: category } },
      include: { category: true },
      orderBy: {
        [sortField]: sortType,
      },
      skip,
      take,
    });
    const totalPages = Math.ceil(products.length / take);
    return { products, totalPages, page };
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductNotFoundError({
        method: "getProductsByCategory",
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const updateProduct = async (data: updateProductArgs) => {
  try {
    const { id, newData } = data;
    const product = await prisma.product.update({
      where: { id },
      data: newData,
    });
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductUpdateError({
        method: `updateProduct`,
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const updateProductCategory = async (
  data: updateProductCategoryArgs
) => {
  try {
    const { category, id } = data;
    const isCategory = await prisma.category.findFirst({
      where: { name: category },
    });
    const categoryData = { name: category, slug: category };
    if (!isCategory) {
      const newCategory = await prisma.category.create({
        data: categoryData,
      });
      return await prisma.product.update({
        where: { id },
        data: { categoryId: newCategory.id },
      });
    }
    return await prisma.product.update({
      where: { id },
      data: { category: { update: categoryData } },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ProductUpdateError({
        method: `updateProductCategory`,
        originalError: error,
      });
    }
    throw new Error(`${error}`);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    return deletedProduct;
  } catch (error) {
    throw new Error(`Error while deleting product ${error}`);
  }
};
