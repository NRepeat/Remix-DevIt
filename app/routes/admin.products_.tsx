import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import CRUDPanel from "~/components/Admin/MainLayout/MainLayout";
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
        return json({ success: true });
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
  return (
    <>
      <CRUDPanel>
        <Outlet />
      </CRUDPanel>
    </>
  );
}
