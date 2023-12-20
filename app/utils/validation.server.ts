import { z } from "zod";
import { getProduct } from "~/services/product.server";

export async function isProductInStock(
  productId: number,
  requestedQuantity: number
): Promise<boolean> {
  const product = await getProduct(productId);
  return product.stock >= requestedQuantity;
}
export function parseAndValidateNumber(number: number | string | null) {
  return z.coerce.number().parse(number);
}
