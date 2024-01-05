import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import Cart from "~/Pages/Cart/Cart";
import { customerAuthenticator } from "~/services/auth.server";
import { getCartByCustomerId } from "~/services/cart.server";
import { getResponseError } from "~/services/errorResponse.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const customer = await customerAuthenticator.isAuthenticated(request);
    if (customer) {
      const customerCart = await getCartByCustomerId(customer.id);
      return json({ customerCart });
    }
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  return <Cart />;
}
