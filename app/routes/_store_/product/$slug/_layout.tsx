import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { SingleProductLayout } from "~/Layout/StoreSingleProductLayout/SingleProductLayout";
import { customerAuthenticator } from "~/services/auth.server";
import {
  createCart,
  getCartByCustomerId,
  getCartById,
} from "~/services/cart.server";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { NotFound } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";
import { commitSession, getSession } from "~/services/session.server";
import { addToCart, checkProduct } from "./actions";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const product = await checkProduct(formData);
    if (!product) {
      throw new NotFound();
    }
    const session = await getSession(request.headers.get("Cookie"));
    const customer = await customerAuthenticator.isAuthenticated(request);
    const sessionCart = createSessionCart(session);
    const sessionCartId = sessionCart.getId();

    if (customer) {
      const cart = await getCartByCustomerId(customer.id);
      if (cart) {
        sessionCart.addProduct(product.id);
        sessionCart.setCartId(cart.id);
        await addToCart(cart, sessionCart);
        return json(
          { success: true },
          { headers: { "Set-Cookie": await commitSession(session) } }
        );
      } else {
        const newCustomerCart = await createCart(customer.id);
        sessionCart.setCartId(newCustomerCart.id);
        sessionCart.addProduct(product.id);
        await addToCart(newCustomerCart, sessionCart);
        return json(
          { success: true },
          { headers: { "Set-Cookie": await commitSession(session) } }
        );
      }
    } else if (sessionCartId) {
      const anonymCart = await getCartById(sessionCartId);
      if (anonymCart) {
        sessionCart.addProduct(product.id);
        await addToCart(anonymCart, sessionCart);
        return json(
          { success: true },
          { headers: { "Set-Cookie": await commitSession(session) } }
        );
      }
      const newAnonymCart = await createCart();
      sessionCart.setCartId(newAnonymCart.id);
      sessionCart.addProduct(product.id);
      await addToCart(newAnonymCart, sessionCart);
      return json(
        { success: true },
        { headers: { "Set-Cookie": await commitSession(session) } }
      );
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
