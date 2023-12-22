import type { SerializeFrom } from "@remix-run/node";
import type { ProductData } from "~/services/product.server";

export const chunkProductData = (
  productData: SerializeFrom<ProductData>,
  chunkSize: number
) => {
  const chunks = [];

  for (let i = 0; i < productData.products.length; i += chunkSize) {
    chunks.push(productData.products.slice(i, i + chunkSize));
  }
  return chunks;
};
