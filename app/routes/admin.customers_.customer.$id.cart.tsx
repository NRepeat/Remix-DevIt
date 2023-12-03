import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ItemsList from "~/components/Admin/CartPanels/ItemsList/ItemsList";
import { getCartByCustomerId } from "~/services/cart.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const customerId = parseInt(params.id!)
  const cart = await getCartByCustomerId(customerId)
  if (!cart) {
    throw new Response("Cart Not Found", { status: 404 });
  }
  return json({ cart, customerId })
}

export default function () {
  const data = useLoaderData<typeof loader>()
  return <div className="cartContainer">

<ItemsList cart={data.cart} customerId={data.customerId} />
  </div>  

}