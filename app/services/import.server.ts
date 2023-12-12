import { validationError } from "remix-validated-form";
import { formatString } from "~/utils/formatting.server";
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
        const validatedProduct = await dummyProductDataSchema.validate(product);

        if (validatedProduct.error) {
          return validationError(validatedProduct.error);
        }
        const existedProduct = await prisma.product.findFirst({
          where: { externalId: validatedProduct.data.id },
        });
        if (!existedProduct) {
          await prisma.product.create({
            data: {
              externalId: validatedProduct.data.id,
              brand: validatedProduct.data.brand,
              description: validatedProduct.data.description,
              discountPercentage: validatedProduct.data.discountPercentage,
              price: validatedProduct.data.price,
              rating: validatedProduct.data.rating,
              stock: validatedProduct.data.stock,
              thumbnail: validatedProduct.data.thumbnail,
              title: validatedProduct.data.title,
              images: validatedProduct.data.images,
              category: {
                connectOrCreate: {
                  where: { slug: validatedProduct.data.category },
                  create: {
                    slug: validatedProduct.data.category,
                    name: formatString(validatedProduct.data.category),
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
