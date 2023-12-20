import { parseAndValidateNumber } from "./validation.server";

type calculatePaginationSizeArgs = {
  page: number;
};

const take = parseAndValidateNumber(process.env.PRODUCT_TAKE!) || 12;

export function calculatePaginationSize(data: calculatePaginationSizeArgs): {
  skip: number;
  take: number;
} {
  const validatedTake = Math.max(1, take);
  const skip = (data.page - 1) * validatedTake;

  return { skip, take: validatedTake };
}
