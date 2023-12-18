import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import CreateProduct from "~/components/Admin/ProductPanels/CreateProductPanel/CreateProduct";
import type { CreateProductArgs } from "~/services/product.server";
import { createProduct } from "~/services/product.server";
import { CreateProductDataSchema } from "~/utils/productValidation";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const validatedFormData = await request.formData();

    const validationResult =
      await CreateProductDataSchema.validate(validatedFormData);

    if (validationResult.data) {
      try {
        const data: CreateProductArgs = { data: validationResult.data };
        await createProduct(data);
        return redirect("/admin/products");
      } catch (error) {
        throw new Error(`Error while creating products`);
      }
    }
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

export default function () {
  return <CreateProduct />;
}
