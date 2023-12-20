import { parseAndValidateNumber } from "./validation.server";

type calculatePaginationSizeArgs = {
  page: number;
};
const productTake = process.env.PRODUCT_TAKE || 24;
console.log("🚀 ~ file: pagination.server.ts:7 ~  productTake:", productTake);

const take = parseAndValidateNumber(productTake);

export function calculatePaginationSize(data: calculatePaginationSizeArgs): {
  skip: number;
  take: number;
} {
  const validatedTake = Math.max(1, take);
  const skip = (data.page - 1) * validatedTake;

  return { skip, take: validatedTake };
}
