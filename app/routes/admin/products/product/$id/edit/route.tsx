import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { z } from "zod";
import { editProductSchema } from "~/components/Admin/ProductPanels/EditProductPanel/EditProductForm/EditProductForm";
import EditProductPanel from "~/components/Admin/ProductPanels/EditProductPanel/EditProductPanel";
import { NotFound } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";
import {
  getProduct,
  updateProduct,
  updateProductCategory,
} from "~/services/product.server";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const product = await getProduct({
      id: z.coerce.number().parse(params.id),
    });

    if (!product) {
      throw new NotFound({ message: "Product Not Found", code: 4004 });
    }
    return json({ product });
  } catch (error) {
    getResponseError(error);
  }
}

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.id);
  try {
    const formData = Object.fromEntries(await request.formData());

    const validatedProductData = await editProductSchema.validate(formData);
    if (validatedProductData.error) {
      return validationError(validatedProductData.error);
    }
    const { category, ...productData } = validatedProductData.data;
    const product = await getProduct({
      id: z.coerce.number().parse(params.id),
    });
    if (!product) {
      throw new NotFound({ message: "Product Not Found", code: 4004 });
    }
    await updateProduct({ id: product.id, newData: productData });
    await updateProductCategory({ id: product.id, category });
    return redirect("/admin/products");
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <EditProductPanel product={data.product} />;
}
