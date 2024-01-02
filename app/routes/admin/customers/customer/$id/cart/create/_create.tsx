import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { createCart } from "~/services/cart.server";
import { getHTTPError } from "~/services/errorResponse.server";

export async function action({ params }: ActionFunctionArgs) {
  try {
    const id = z.coerce.number().parse(params.id);
    await createCart(id);
    return redirect("/admin/customers");
  } catch (error) {
    getHTTPError(error);
  }
}
