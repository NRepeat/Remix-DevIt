import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import ErrorOutofStock from "~/components/ErrorOutofStock/ErrorOutofStock";
import Product from "~/components/Product/Product";
import { createCart } from "~/services/cart.server";
import { getProduct } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing contactId param");
  const product = await getProduct(params.productId);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  return json({ product, cart: cart.items() });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = request.formData();
  const productId = (await formData).get("productId");
  const productStock = (await formData).get("productStock");
  invariant(typeof productId === "string", "Missing product id");
  invariant(typeof productStock === "string", "Missing product stock");
  const session = await getSession(request.headers.get("Cookie"));

  const cart = createCart(session);
  cart.addProduct(productId, productStock);
  if (session.data.__flash_error__) {
    redirect(`/error/${session.data.__flash_error__}`);

    return json(
      { data: "Out of stock", success: false },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

  return json(
    { success: true },
    { headers: { "Set-Cookie": await commitSession(session) } }
  ); // save session to cookie
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [];
  }
  return [
    {
      title: data.product.title,
    },
  ];
};
function ProductPage() {
  const { product, cart } = useLoaderData<typeof loader>();
  const quantity = (cart.find((item) => Number(item.productId) === product.id)
    ?.quantity ?? 0) as number;
  return <Product product={product} quantity={quantity} />;
}

export default ProductPage;
