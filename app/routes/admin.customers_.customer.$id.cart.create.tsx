import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createCart } from "~/services/cart.server";
export async function action({ params }: ActionFunctionArgs) {
  invariant(params.id);
  if (params.id)
    try {
      await createCart(parseInt(params.id));
      redirect("/admin/customers");
    } catch (error) {
      throw new Response("Oh no! Something went wrong!", {
        status: 500,
      });
    }
  return json({ success: true });
}
