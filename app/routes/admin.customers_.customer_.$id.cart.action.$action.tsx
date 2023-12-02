import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { deleteCartItem, updateCartItem } from "~/services/cartItem.server";


export async function action({ request, params }: ActionFunctionArgs) {

  const formData = await request.formData();
  const quantity = formData.get("quantity") as string
  const productCartId = formData.get("id") as string

  if (params.action === "editQuantity" && quantity! && quantity!) {
    await updateCartItem(parseInt(productCartId), parseInt(quantity))
    return redirect(`/admin/customers/customer/${params.id}/cart`)
  } else if (params.action === "delete") {
    await deleteCartItem(parseInt(productCartId))
    return redirect(`/admin/customers/customer/${params.id}/cart`)
  }

  return json({success:true})
}


