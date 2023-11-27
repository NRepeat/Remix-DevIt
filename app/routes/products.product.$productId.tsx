import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
  defer,
  json,
} from "@remix-run/node";
import {
  useLoaderData, 
} from "@remix-run/react";
import invariant from "tiny-invariant";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import Product from "~/components/Product/Product";
import { createCart } from "~/services/cart.server";
import { getProduct } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";
import productPage from "../styles/productPage.css";



export const links: LinksFunction = () => [
  { rel: "stylesheet", href: productPage},
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing contactId param");
  const product = await getProduct(params.productId);
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  if (product.message) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return json({ product, cart: cart.items()[product.id] });
};



export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const productId = formData.get("productId");
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
  const breadcrumbs = [
    { label: "Home", link: "/" },
    {
      label: `${data.product.category}`,
      link: `/products/category/${data.product.category}`,
    },
    {label:`${data.product.title}`,link:""}
  ];
  return (
    <div className="productContainer">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Product data={data} />
    </div>
  );
}

export default ProductRoute;
