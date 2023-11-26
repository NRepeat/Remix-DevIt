import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  defer,
  json,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";
import Product from "~/components/Product/Product";
import { createCart } from "~/services/cart.server";
import { getProduct } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";


export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing contactId param");
  const product = await getProduct(params.productId);
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  if (product.message) {
    throw new Response("Not Found", { status: 404 });
  }

  return defer({ product, cart: cart.items() });
};
export function ErrorBoundary() {
  return (
    <div>
      <h2>Page not found</h2>

      <Link to="/">Go to main page</Link>

    </div>
  );
}
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = request.formData();
  const productId = (await formData).get("productId");
  invariant(typeof productId === "string", "Missing product id");
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  cart.addProduct(productId);

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

function ProductRoute() {
  const data = useLoaderData<typeof loader>();

  return <Product product={data.product} />;
}

export default ProductRoute;
