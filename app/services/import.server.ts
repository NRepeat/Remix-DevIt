import { formatString, stringToSlug } from "~/utils/formatting.server";
import { dummyProductDataSchema } from "~/utils/productValidation";
import { fetchLimitedData } from "./dummy.server";

export async function importDummyData() {
  const limit = 10;
  let skip = 0;
  while (true) {
    const dummyProductsData = await fetchLimitedData(limit, skip);
    if (dummyProductsData.products.length < 1) {
      break;
    }
    skip += limit;
    for (const product of dummyProductsData.products) {
      try {
        const validatedProduct = dummyProductDataSchema.parse(product);

        const existedProduct = await prisma.product.findFirst({
          where: { externalId: validatedProduct.id },
        });
        if (!existedProduct) {
          await prisma.product.create({
            data: {
              externalId: validatedProduct.id,
              slug: stringToSlug(validatedProduct.title),
              brand: validatedProduct.brand,
              description: validatedProduct.description,
              discountPercentage: validatedProduct.discountPercentage,
              price: validatedProduct.price,
              rating: validatedProduct.rating,
              stock: validatedProduct.stock,
              thumbnail: validatedProduct.thumbnail,
              title: validatedProduct.title,
              images: validatedProduct.images,
              category: {
                connectOrCreate: {
                  where: { slug: validatedProduct.category },
                  create: {
                    slug: stringToSlug(validatedProduct.category),
                    name: formatString(validatedProduct.category),
                  },
                },
              },
            },
          });
        }
      } catch (error) {
        throw new Error(`Error while creating product ${error}`);
      }
    }
  }
}
