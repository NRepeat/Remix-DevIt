import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PageLayout from "~/Layout/StorePageLayout/PageLayout";
import GlobalLoader from "~/components/Ui/GlobalLoading/GlobalLoader";
import { customerAuthenticator } from "~/services/auth.server";
import { createCart, getCartByCustomerId } from "~/services/cart.server";
import { createCartItem } from "~/services/cartItem.server";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { getResponseError } from "~/services/errorResponse.server";
import { getAllProductCategories } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const categories = await getAllProductCategories();
    const customer = await customerAuthenticator.isAuthenticated(request);
    const cart = createSessionCart(session);
    if (customer) {
      const customerCart = await getCartByCustomerId(customer.id);
      if (customerCart) {
        cart.setCartId(customerCart.id);
        customerCart.cartItems.map((item) => {
          return cart.syncProducts(item.product.id, item.quantity);
        });
        return json(
          {
            cart: cart.items(),
            categories,
            customer,
          },
          { headers: { "Set-Cookie": await commitSession(session) } }
        );
      }
      const newCustomerCart = await createCart(customer.id);
      cart.items().map(
        async (item) =>
          await createCartItem({
            cartId: newCustomerCart.id,
            productId: item.productId,
            quantity: item.quantity,
          })
      );
      cart.setCartId(newCustomerCart.id);
    }
    if (!session.has("cart") || !customer) {
      const anonymCart = await createCart();
      cart.setCartId(anonymCart.id);
      return json(
        {
          cart: cart.items(),
          categories,
          customer,
        },
        { headers: { "Set-Cookie": await commitSession(session) } }
      );
    }

    return json(
      {
        cart: cart.items(),
        categories,
        customer,
      },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  } catch (error) {
    getResponseError(error);
  }
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <PageLayout data={data}>
      <GlobalLoader isAdmin={false} />
      <Outlet />
    </PageLayout>
  );
}
