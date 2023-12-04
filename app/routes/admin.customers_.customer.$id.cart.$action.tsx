import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import AdminError from "~/components/Errors/AdminError/AdminError";
import { createCart } from "~/services/cart.server";
import { createCartItem, deleteCartItem, getCartItemById, updateCartItem } from "~/services/cartItem.server";
import { getProduct } from "~/services/product.server";

const parseAndValidateInt = (value: FormDataEntryValue | null | undefined): number | null => {
  const parsedValue = parseInt(String(value));
  return !isNaN(parsedValue) ? parsedValue : null;
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const quantity = parseAndValidateInt(formData.get("quantity"));
  const productId = parseAndValidateInt(formData.get("productId"));
  const cartId = parseAndValidateInt(formData.get("cartId"));
  const productCartId = parseAndValidateInt(formData.get("id"));

  switch (params.action) {
    case "editQuantity":
      if (quantity !== null && productCartId !== null) {
        const cartProduct = await getCartItemById(productCartId)
        if (cartProduct?.product.stock! >= quantity) {
          await updateCartItem(productCartId, quantity);
          return redirect(`/admin/customers/customer/${params.id}/cart`);
        } else {
          throw new Response("Out of stock")
        }
      } else {
        throw new Response("Invalid quantity or productCartId")
      }

    case "delete":
      if (productCartId !== null) {
        await deleteCartItem(productCartId);
        return redirect(`/admin/customers/customer/${params.id}/cart`);
      } else {
        throw new Response("Invalid productCartId");
      }

    case "create":
      await createCart(parseInt(params.id!));
      return redirect(`/admin/customers`);

    case "addItem":
      if (cartId !== null && productId !== null && quantity !== null) {
        const product = await getProduct(productId)
        if (product?.stock! >= quantity) {
          await createCartItem({ cartId, productId, quantity });
          return redirect(`/admin/customers/customer/${params.id}/cart`);
        }else {
          throw new Response("Out of stock")
        }

      } else {
        throw new Response("Out of stock")
      }


    default:
      return json({ success: true });
  }
}

export function ErrorBoundary() {

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <AdminError error={error} />
  }
}

