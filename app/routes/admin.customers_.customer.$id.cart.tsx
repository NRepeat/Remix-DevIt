import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getCartByCustomerId } from "~/services/cart.server";
import { searchProduct } from "~/services/product.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.id);
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const pageQuery = url.searchParams.get("page");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const customerId = parseInt(params.id);

  if (searchQuery === "") {
    return redirect(`/admin/customers/customer/${customerId}/cart`);
  }
  const cart = await getCartByCustomerId(customerId);
  const products = await searchProduct(searchQuery!, page, "novelty");

  if (!cart) {
    throw new Response("Cart Not Found", { status: 404 });
  }
  return json({ cart, customerId, products });
};

export default function () {
  // const data = useLoaderData<typeof loader>();

  return <></>;
}
