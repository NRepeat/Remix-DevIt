import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Cart from "~/Pages/Cart/Cart";
import { customerAuthenticator } from "~/services/auth.server";
import { getCartByCustomerId, getCartById } from "~/services/cart.server";
import { getResponseError } from "~/services/errorResponse.server";
import { getSession } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("cart")) {
      return null;
    }
    const customer = await customerAuthenticator.isAuthenticated(request);
    if (!customer) {
      const sessionCartId = await session.get("cart").id;
      const cart = await getCartById(sessionCartId);
      return json({ cart });
    }
    const customerCart = await getCartByCustomerId(customer.id);
    return json({ customerCart });
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  if (data && "cart" in data) {
    return <Cart items={data.cart} />;
  }
  return <Cart items={data ? data.customerCart : null} />;
}
