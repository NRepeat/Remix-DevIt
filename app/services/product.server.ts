import type { Category, Product } from "@prisma/client";
import { formatString } from "~/utils/formatting.server";
import { calculatePaginationSize } from "~/utils/pagination.server";
import { prisma } from "~/utils/prisma.server";

export interface ProductData {
  products: ({
    category?: Category;
  } & Product)[];
  totalPages?: number;
  page?: number;
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
type ProductCreateData = {
  category: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string;
};

export type CreateProductArgs = {
  data: ProductCreateData;
};
let sortField = "price";
let sortType = "desc";
export const createProduct = async ({ data }: CreateProductArgs) => {
  try {
    await prisma.product.create({
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
  } catch (error) {
    throw new Error("Error creating product");
  }
};

export const getAllProducts = async (
  page: number,
  sortName?: string | null
): Promise<ProductData> => {
  const { skip, take } = calculatePaginationSize({ page });

  if (sortName) {
    sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
    sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
  }

  try {
    const [products, totalProductsCount] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: {
          [sortField]: sortType,
        },
        skip,
        take,
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalProductsCount / take);

    return { products, totalPages, page };
  } catch (error) {
    throw new Error(`Error during get all products ${error}`);
  }
};

type getProductArgs = {
  id?: number;
  slug?: string;
};

export const getProduct = async (
  data: getProductArgs
): Promise<Product & { category: Category }> => {
  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ id: data.id }, { slug: data.slug }] },
      include: { category: true },
    });
    return product!;
  } catch (error) {
    throw new Error(`Error during get product: ${error}`);
  }
};

export const searchProduct = async (
  page: number,
  search?: string,

  sortName?: string | null
): Promise<ProductData> => {
  if (sortName) {
    sortField = sortFieldMap[sortName as keyof typeof sortFieldMap];
    sortType = sortTypeMap[sortName as keyof typeof sortFieldMap];
  }
  try {
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
    throw new Error(`Error during product search: ${error}`);
  }
};

export const getAllProductCategories = async (): Promise<Category[]> => {
  try {
    const category = prisma.category.findMany();
    return category;
  } catch (error) {
    throw new Error(`Error during categories search: ${error}`);
  }
};

export const getProductsByCategory = async (
  category: string,
  page?: number,
  sortName?: string | null
): Promise<ProductData> => {
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
    throw new Error(`Error during products by category search: ${error}`);
  }
};

export const updateProduct = async (
  id: number,
  data: {
    img?: string;
    title?: string;
    description?: string;
    rating?: number;
    stock?: number;
    price?: number;
  }
) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return product;
  } catch (error) {
    throw new Error(`Error during updating  products: ${error}`);
  }
};
export const updateProductCategory = async (id: number, category: string) => {
  try {
    const isCategory = await prisma.category.findFirst({
      where: { name: category },
    });

    let categoryData = { name: category, slug: category };

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
    throw new Error(`Error during updating products: ${error}`);
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
