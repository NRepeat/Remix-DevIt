import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { SingleProductLayout } from "~/Layout/SingleProductLayout/SingleProductLayout";
import Product from "~/components/Store/Product/Product";
import ProductsLike from "~/components/Store/ProductsLike/ProductsLike";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { getProduct, getProductsByCategory } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";
import productPage from "../styles/productPage.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: productPage },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing contactId param");
  const productId = Number(params.productId);
  const product = await getProduct(productId);
  const productsByCAtegory = await getProductsByCategory(product.category.slug);
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createSessionCart(session);
  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return json({
    productsByCAtegory,
    product,
    cart: cart.items()[product.id] || { productId: "", quantity: 0 },
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // const session = await getSession(request.headers.get("cookie"));
  // session.flash("error", "To add item in cart, login please");

  // const headers = new Headers({ "Set-Cookie": await commitSession(session) });
  // return redirect("/login", {
  //   headers,
  // });
  const formData = await request.formData();
  const productId = formData.get("productId");
  invariant(typeof productId === "string", "Missing product id");
  const session = await getSession(request.headers.get("Cookie"));
  const sessionCart = createSessionCart(session);

  sessionCart.addProduct(productId);

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
      label: `${data.product.category.slug}`,
      link: `/categories/${data.product.category.slug}`,
    },
    { label: `${data.product.title}`, link: "" },
  ];
  return (
    <>
      <SingleProductLayout>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={false} />

        <Product data={data} />

        <ProductsLike data={data.productsByCAtegory} />
      </SingleProductLayout>
    </>
  );
}

export default ProductRoute;
