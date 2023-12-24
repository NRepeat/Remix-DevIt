import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { z } from "zod";
import { SingleProductLayout } from "~/Layout/StoreSingleProductLayout/SingleProductLayout";
import Product from "~/components/Store/Product/Product";
import ProductsLike from "~/components/Store/ProductsLike/ProductsLike";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { createCart as createSessionCart } from "~/services/cartSession.server";
import { getProduct, getProductsByCategory } from "~/services/product.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Missing slug param");
  const slug = params.slug;
  const product = await getProduct({ slug });
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
  const formData = await request.formData();
  const productId = formData.get("productId");
  const session = await getSession(request.headers.get("Cookie"));
  const sessionCart = createSessionCart(session);
  const validateId = z.coerce.number();
  sessionCart.addProduct(validateId.parse(productId));

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
      {/* <Header>
        <StoreHeader customer={true} />
      </Header> */}
      <SingleProductLayout>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Product data={data} />
        <ProductsLike data={data.productsByCAtegory} />
      </SingleProductLayout>
    </>
  );
}

export default ProductRoute;
