import { parseAndValidateNumber } from "./validation.server";

type calculatePaginationSizeArgs = {
  page?: number;
};
const productTake = process.env.PRODUCT_TAKE || 20;

const take = parseAndValidateNumber(productTake);

export function calculatePaginationSize(data: calculatePaginationSizeArgs): {
  skip: number;
  take: number;
} {
  const validatedTake = Math.max(1, take);
  let skip = 0;

  if (data.page) {
    skip = (data.page - 1) * validatedTake;
  }

  return { skip, take: validatedTake };
}
