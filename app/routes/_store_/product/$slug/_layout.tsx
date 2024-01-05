import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { SingleProductLayout } from "~/Layout/StoreSingleProductLayout/SingleProductLayout";
import { customerAuthenticator } from "~/services/auth.server";
import { createCart, getCartByCustomerId } from "~/services/cart.server";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { NotFound } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";
import { UnauthorizedError } from "~/services/httpErrors.server";
import { commitSession, getSession } from "~/services/session.server";
import { addToCart, checkProduct } from "./actions";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));

    if (!session) {
      throw UnauthorizedError("Session not found or invalid");
    }
    const customer = await customerAuthenticator.isAuthenticated(request);
    console.log("🚀 ~ file: _layout.tsx:22 ~ action ~ customer:", customer);

    const sessionCart = createSessionCart(session);
    const formData = await request.formData();

    const product = await checkProduct(formData);
    if (!product) {
      throw new NotFound();
    }
    if (customer) {
      sessionCart.addProduct(product.id);

      const cart = await getCartByCustomerId(customer.id);
      if (cart) {
        await addToCart(cart, sessionCart);
      }
      const newCart = await createCart(customer.id);
      await addToCart(newCart, sessionCart);
    } else {
      const createdCart = await createCart();

      sessionCart.setCartId(createdCart.id);

      sessionCart.addProduct(product.id);
      await addToCart(createdCart, sessionCart);
    }

    return json(
      { success: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  } catch (error) {
    getResponseError(error);
  }
};

export function ProductRoute() {
  return (
    <SingleProductLayout>
      <Outlet />
    </SingleProductLayout>
  );
}

export default ProductRoute;
