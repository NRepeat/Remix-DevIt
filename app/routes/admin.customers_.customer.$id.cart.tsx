import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import ItemsList from "~/components/Admin/CartPanels/ItemsList/ItemsList";
import { getCartByCustomerId } from "~/services/cart.server";
import { searchProduct } from "~/services/product.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const pageQuery = url.searchParams.get("page");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const customerId = parseInt(params.id!);

  if(searchQuery===""){
    return redirect (`/admin/customers/customer/${customerId}/cart`)
  }
  const cart = await getCartByCustomerId(customerId);
  console.log("🚀 ~ file: admin.customers_.customer.$id.cart.tsx:19 ~ loader ~ cart:", cart)
  const products  = await searchProduct(searchQuery! ,"novelty",page)
  
  if (!cart) {
    throw new Response("Cart Not Found", { status: 404 });
  }
  return json({ cart, customerId ,products });
};



export default function () {
  const data = useLoaderData<typeof loader>();  
  
  return (
    <div className="containerBase">
      <ItemsList cart={data.cart} customerId={data.customerId}  products={data.products}/>
      <Outlet/>
    </div>
  );
}
