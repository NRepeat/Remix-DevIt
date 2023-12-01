import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCartByCustomerId} from "~/services/cart.server";


export const loader = async ({request,params}:LoaderFunctionArgs)=>{

const cart = await getCartByCustomerId(parseInt(params.id!))

return json({cart})
} 

export default function () {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <ul>
        {data.cart?.cartItems.map((item)=> <li>{item.product.title } {item.quantity} <Link to={"edit"}>Edit</Link> <Link to={"delete"}>Delete</Link> </li>)}
      </ul>
      <Link to={"/admin/customers/"}>Close</Link>
    </div>
  );
}