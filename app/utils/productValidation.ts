import { z } from "zod";

export const dummyProductDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
});

export const quantitySchema = z.number().positive();
