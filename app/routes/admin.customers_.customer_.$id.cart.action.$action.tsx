import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { deleteCartItem, updateCartItem } from "~/services/cartItem.server";

export async function action({ request, params }: ActionFunctionArgs) {

  const formData = await request.formData();
  const quantity = formData.get("quantity") as string;
  const productCartId = formData.get("id") as string;

  if (params.action === "editQuantity" && quantity && productCartId) {
    const parsedQuantity = parseInt(quantity);
    const parsedProductCartId = parseInt(productCartId);

    if (!isNaN(parsedQuantity) && !isNaN(parsedProductCartId)) {
      await updateCartItem(parsedProductCartId, parsedQuantity);
      return redirect(`/admin/customers/customer/${params.id}/cart`);
    } else {
      return json({ error: "Invalid quantity or productCartId" });
    }
  } else if (params.action === "delete" && productCartId) {
    const parsedProductCartId = parseInt(productCartId);

    if (!isNaN(parsedProductCartId)) {
      await deleteCartItem(parsedProductCartId);
      return redirect(`/admin/customers/customer/${params.id}/cart`);
    } else {
      return json({ error: "Invalid productCartId" });
    }
  }

  return json({ success: true });
}
