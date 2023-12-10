import { getProduct } from "~/services/product.server";

export async function isProductInStock(
  productId: number,
  requestedQuantity: number
): Promise<boolean> {
  const product = await getProduct(productId);
  return product.stock >= requestedQuantity;
}

export function validateNumberTypeInFormData(
  value: FormDataEntryValue | null | undefined
): number | null {
  const parsedValue = parseInt(String(value));
  return !isNaN(parsedValue) ? parsedValue : null;
}

export function validateStringTypeInFormData(
  value: FormDataEntryValue | null | undefined
): string | null {
  return value !== null && value !== undefined ? String(value) : null;
}
