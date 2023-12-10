import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import CartItemErrors from "~/components/Errors/AdminError/CartItemErrors/CartItemErrors";
import { deleteCartItem } from "~/services/cartItem.server";
import { validateNumberTypeInFormData } from "~/utils/validation.server";

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const productCartId = validateNumberTypeInFormData(
      formData.get("cartItemId")
    );

    if (productCartId) {
      await deleteCartItem(productCartId);
      return redirect(`/admin/customers/customer/${params.id}/cart`);
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
