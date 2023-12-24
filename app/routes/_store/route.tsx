import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import { createCart } from "~/services/cartSession.server";
import { getAllProductCategories } from "~/services/product.server";
import { getSession } from "~/services/session.server";
import { isCustomer, isMember } from "~/utils/validation.server";
import rootIndexStylesHref from "../../styles/rootIndex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootIndexStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  const isMemberWithData = await isMember(request);
  const isCustomerWithData = await isCustomer(request);
  const cart = createCart(session);
  const categories = await getAllProductCategories();
  return json({
    cart: cart.items(),
    categories,
    isCustomerWithData,
    isMemberWithData,
  });
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <PageLayout data={data}>
      <Outlet />
    </PageLayout>
  );
}
