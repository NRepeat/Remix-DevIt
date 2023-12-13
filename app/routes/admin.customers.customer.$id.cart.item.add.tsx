import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createCartItem } from "~/services/cartItem.server";
import {
  isProductInStock,
  validateNumberTypeInFormData,
} from "~/utils/validation.server";

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const quantity = validateNumberTypeInFormData(formData.get("quantity"));
    const productId = validateNumberTypeInFormData(formData.get("productId"));
    const cartId = validateNumberTypeInFormData(formData.get("cartId"));
    const externalId = validateNumberTypeInFormData(formData.get("externalId"));
    if (cartId && productId && quantity && externalId) {
      if (await isProductInStock(productId, quantity)) {
        await createCartItem({ cartId, productId, quantity, externalId });
        return redirect(`/admin/customers/customer/${params.id}/cart`);
      } else {
        throw new Response("Out of stock");
      }
    } else {
      throw new Response("Missing required parameters");
    }
  } catch (error) {
    throw new Response(`Internal Server Error ${error}`, { status: 500 });
  }
}



