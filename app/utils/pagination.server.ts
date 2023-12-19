import { z } from "zod";

export const coerceNumber = z.coerce.number();
const take = coerceNumber.parse(process.env.PRODUCT_TAKE);

type calculatePaginationSizeArgs = {
  page: number;
  totalProductsCount: number;
};
export function calculatePaginationSize(data: calculatePaginationSizeArgs) {
  const skip = (data.page - 1) * take;
  const totalPages = Math.ceil(data.totalProductsCount / take);
  return { skip, take, totalPages };
}
