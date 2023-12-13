import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import CRUDPanel from "~/components/Admin/CRUD/CRUDPanel";
import type { CreateProductArgs } from "~/services/product.server";
import { createProduct } from "~/services/product.server";
import { CreateProductDataSchema } from "~/utils/productValidation";

export async function action({ params, request }: ActionFunctionArgs) {
  const validatedFormData = await request.formData();

  const validationResult =
    await CreateProductDataSchema.validate(validatedFormData);
  console.log(
    "🚀 ~ file: admin.products_.tsx:13 ~ action ~ validationResult:",
    validationResult
  );

  if (validationResult.data) {
    try {
      const data: CreateProductArgs = { data: validationResult.data };
      await createProduct(data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  return json({ success: true });
}
export default function () {
  return (
    <>
      <CRUDPanel>
        <Outlet />
      </CRUDPanel>
    </>
  );
}
