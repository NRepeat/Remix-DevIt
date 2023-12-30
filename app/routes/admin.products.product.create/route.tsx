import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import CreateProduct from "~/components/Admin/ProductPanels/CreateProductPanel/CreateProduct";
import { createProduct } from "~/services/product.server";
import { ProductCreateError } from "~/services/productError.server";
import { InternalServerResponse } from "~/services/responseError.server";
import { CreateProductDataSchema } from "~/utils/productValidation";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const validatedFormData = await request.formData();

    const validationResult =
      await CreateProductDataSchema.validate(validatedFormData);

    if (validationResult.data) {
      await createProduct({ data: validationResult.data });
      return redirect("/admin/products");
    }
  } catch (error) {
    if (error instanceof ProductCreateError) {
      throw new InternalServerResponse(
        { success: false, error: "Error while creating product" },
        { status: 500 }
      );
    }

    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
  }
}

export default function () {
  return <CreateProduct />;
}
