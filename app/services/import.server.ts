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
        const existedProduct = await prisma.product.findFirst({
          where: { externalId: product.id },
        });
        if (!existedProduct) {
          const createdProduct = await prisma.product.create({
            data: {
              externalId: product.id,
              brand: product.brand,
              description: product.description,
              discountPercentage: product.discountPercentage,
              price: product.price,
              rating: product.rating,
              stock: product.stock,
              thumbnail: product.thumbnail,
              title: product.title,
              images: product.images,
              category: {
                connectOrCreate: {
                  where: { slug: product.category },
                  create: { slug: product.category },
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

