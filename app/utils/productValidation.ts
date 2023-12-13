import { withZod } from "@remix-validated-form/with-zod";
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
export const CreateProductDataSchema = withZod(
  z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number(),
    discountPercentage: z.string(),
    rating: z.string(),
    stock: z.string(),
    brand: z.string().min(3),
    category: z.string().min(3),
    thumbnail: z.string(),
    images: z.string(),
  })
);
export const quantitySchema = z.number().positive();
