import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ItemsList from "~/components/Admin/CartPanels/ItemsList/ItemsList";
import { getCartByCustomerId } from "~/services/cart.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const customerId = parseInt(params.id!)
  const cart = await getCartByCustomerId(customerId)

  return json({ cart, customerId })
}

export default function () {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <ItemsList cart={data.cart} customerId={data.customerId} />
    </div>
  );
}