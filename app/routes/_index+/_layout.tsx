import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PageLayout from "~/Layout/StorePageLayout/PageLayout";
import GlobalLoader from "~/components/Ui/GlobalLoading/GlobalLoader";
import { createCart } from "~/services/cartSession.server";
import { getAllProductCategories } from "~/services/product.server";
import { InternalServerResponse } from "~/services/responseError.server";
import { getSession } from "~/services/session.server";
import { isCustomer } from "~/utils/validation.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const isCustomerWithData = await isCustomer(request);
    const cart = createCart(session);
    const categories = await getAllProductCategories();

    return json({
      cart: cart.items(),
      categories,
      isCustomerWithData,
    });
  } catch (error) {
    return new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
  }
};

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <PageLayout data={data}>
      <GlobalLoader isAdmin={false} />
      <Outlet />
    </PageLayout>
  );
}
