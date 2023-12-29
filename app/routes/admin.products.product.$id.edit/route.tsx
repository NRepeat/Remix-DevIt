import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { editProductSchema } from "~/components/Admin/ProductPanels/EditProductPanel/EditProductForm/EditProductForm";
import EditProductPanel from "~/components/Admin/ProductPanels/EditProductPanel/EditProductPanel";
import { NotFoundError } from "~/services/error.server";
import {
  getProduct,
  updateProduct,
  updateProductCategory,
} from "~/services/product.server";
import { ProductNotFoundError, ProductUpdateError } from "~/services/productError.server";
import { InternalServerResponse, NotFoundResponse } from "~/services/responseError.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    invariant(params.id);
    const product = await getProduct({ id: parseAndValidateNumber(params.id) });

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
    const product = await getProduct({ id: parseAndValidateNumber(params.id) });
    await updateProduct({ id: product.id, newData: productData });
    await updateProductCategory({ id: product.id, category });
    return redirect("/admin/products");
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      throw new NotFoundResponse(
        { error }
      );
    } else if (error instanceof NotFoundError) {
      throw new NotFoundResponse(
        { error }
      );
    } else if (error instanceof ProductUpdateError) {
      throw new InternalServerResponse(
        { success: false, error: "Error while updating product data" },
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
  const data = useLoaderData<typeof loader>();
  return <EditProductPanel product={data.product} />;
}
