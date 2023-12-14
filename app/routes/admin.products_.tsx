import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
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
        throw new Error(`${error}`);
      }
    }
  } catch (error) {
    throw new Response(`${error}`);
  }
}
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    <></>;
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
