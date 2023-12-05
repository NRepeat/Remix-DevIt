import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import CartItemErrors from "~/components/Errors/AdminError/CartItemErrors/CartItemErrors";
import { createCartItem } from "~/services/cartItem.server";
import { parseAndValidateFormData } from "~/utils/formatting.server";
import { isProductInStock } from "~/utils/validation.server";


export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const quantity = parseAndValidateFormData(formData.get("quantity"));
    const productId = parseAndValidateFormData(formData.get("productId"));
    const cartId = parseAndValidateFormData(formData.get("cartId"));

    if (cartId && productId && quantity) {

      if (await isProductInStock(productId, quantity)) {
        await createCartItem({ cartId, productId, quantity });
        return redirect(`/admin/customers/customer/${params.id}/cart`);
      } else {
        throw new Response("Out of stock");
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
      return <CartItemErrors error={error}/>;
    }
    return null
  }
