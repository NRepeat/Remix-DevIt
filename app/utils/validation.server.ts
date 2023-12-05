import { getProduct } from "~/services/product.server";

export async function checkProductStock(productId: number, requestedQuantity: number): Promise<boolean> {
  const product = await getProduct(productId);
  return product.stock >= requestedQuantity;
}
