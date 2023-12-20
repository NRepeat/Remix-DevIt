import { z } from "zod";

export const coerceNumber = z.coerce.number();
const take = coerceNumber.parse(process.env.PRODUCT_TAKE) || 12;

type calculatePaginationSizeArgs = {
  page: number;
};
export function calculatePaginationSize(data: calculatePaginationSizeArgs): {
  skip: number;
  take: number;
} {
  console.log("Input data:", data);

  // Ensure `take` is a positive number
  const validatedTake = Math.max(1, take);

  const skip = (data.page - 1) * validatedTake;
  console.log("Calculated skip:", skip);

  return { skip, take: validatedTake };
}
