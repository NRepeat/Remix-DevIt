import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ItemsList from "~/components/Admin/CartPanels/ItemsList/ItemsList";
import { getCartByCustomerId} from "~/services/cart.server";


export const loader = async ({request,params}:LoaderFunctionArgs)=>{

const cart = await getCartByCustomerId(parseInt(params.id!))

return json({cart})
} 

export default function () {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
   <ItemsList  cart={data.cart}/>
    </div>
  );
}