import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import CartItemErrors from "~/components/Errors/AdminError/CartItemErrors/CartItemErrors";
import { getCartItemById, updateCartItem } from "~/services/cartItem.server";
import { parseAndValidateFormData } from "~/utils/formatting.server";
import { isProductInStock } from "~/utils/validation.server";

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const quantity = parseAndValidateFormData(formData.get("quantity"));
    const productCartId = parseAndValidateFormData(
      formData.get("cartItemId")
    );
    if (quantity && productCartId) {
      const productCart = await getCartItemById(productCartId);
      if (productCart) {
        if (await isProductInStock(productCart.product.id, quantity)) {
          await updateCartItem(productCartId, quantity);
          return redirect(`/admin/customers/customer/${params.id}/cart`);
        } else {
          throw new Response("Out of stock");
        }
      }
    } else {
      throw new Response("Missing required parameters");
    }
  } catch (error) {
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <CartItemErrors error={error} />;
  }
  return null;
}
