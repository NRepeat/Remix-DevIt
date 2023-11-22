import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  defer,
  json,
} from "@remix-run/node";
import { Await, useLoaderData, useNavigation, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import Product from "~/components/Product/Product";
import { createCart } from "~/services/cart.server";
import { getProduct } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";
import style from "../style.module.css";
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing contactId param");
  const product = await getProduct(params.productId);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  return defer({ product, cart: cart.items() });
};

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
function ProductPage() {
  const navigation = useNavigation();
  const data = useLoaderData<typeof loader>();
  const quantity = (data.cart.find((item) => Number(item.productId) === data.product.id)
    ?.quantity ?? 0) as number;
  
  return (
    <div className={navigation.state === "loading" && navigation.location.pathname === '/'  ? style.loading : ""}>
       <Product product={data.product} quantity={quantity} />
    </div>
  );
}

export default ProductPage;
