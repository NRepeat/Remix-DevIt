import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import SingleCart from "~/components/Admin/CartPanels/SingleCart/SingleCart";
import { getCartByCustomerId } from "~/services/cart.server";
import { getCustomerById } from "~/services/customer.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    invariant(params.id);
    const customerId = parseInt(params.id);

    const customer = await getCustomerById(customerId);
    const cart = await getCartByCustomerId(customerId);
    if (!customer || !cart) {
      throw new Error("Customer Not Found");
    }
    return json({ customer, cart });
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return <SingleCart customer={data.customer} cart={data.cart} />;
}
