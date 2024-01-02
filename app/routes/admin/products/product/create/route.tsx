import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import CreateProduct from "~/components/Admin/ProductPanels/CreateProductPanel/CreateProduct";
import { FormFieldsError } from "~/services/error.server";
import { getHTTPError } from "~/services/errorResponse.server";
import { createProduct } from "~/services/product.server";
import { CreateProductDataSchema } from "~/utils/productValidation";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const validatedFormData = await request.formData();
    const validationResult =
      await CreateProductDataSchema.validate(validatedFormData);

    if (validationResult.error && validationResult.error.fieldErrors) {
      const fieldsKey = Object.keys(validationResult.error.fieldErrors);
      const fieldErrors = validationResult.error.fieldErrors;
      throw new FormFieldsError("Login", fieldsKey, fieldErrors);
    }

    if (validationResult.data) {
      await createProduct({ data: validationResult.data });
      return redirect("/admin/products");
    }
  } catch (error) {
    if (error instanceof FormFieldsError) {
      if (error.fieldErrors)
        return validationError({
          fieldErrors: error.fieldErrors,
        });
    }
    getHTTPError(error);
  }
}
export default function () {
  return <CreateProduct />;
}
