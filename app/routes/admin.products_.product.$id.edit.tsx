import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { editProductSchema } from "~/components/Admin/ProductPanels/EditProductPanel/EditProductForm/EditProductForm";
import EditProductPanel from "~/components/Admin/ProductPanels/EditProductPanel/EditProductPanel";
import {
  getProduct,
  updateProduct,
  updateProductCategory,
} from "~/services/product.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    invariant(params.id);
    const product = await getProduct(parseAndValidateNumber(params.id));

    if (!product) {
      throw new Error("Product Not Found");
    }
    return json({ product });
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
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
    const product = await getProduct(parseAndValidateNumber(params.id));
    await updateProduct(product.id, productData);
    await updateProductCategory(product.id, category);
    return redirect("/admin/products");
  } catch (error) {
    throw new Response(`Error while updating customer`);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <EditProductPanel product={data.product} />;
}
