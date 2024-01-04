import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PageLayout from "~/Layout/StorePageLayout/PageLayout";
import GlobalLoader from "~/components/Ui/GlobalLoading/GlobalLoader";
import { createCart } from "~/services/cartSession.server";
import { getResponseError } from "~/services/errorResponse.server";
import { UnauthorizedError } from "~/services/httpErrors.server";
import { getAllProductCategories } from "~/services/product.server";
import { getSession } from "~/services/session.server";
import { isCustomer } from "~/utils/validation.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session) {
      throw UnauthorizedError("Session not found or invalid");
    }
    const isCustomerWithData = await isCustomer(request);
    const cart = createCart(session);
    const categories = await getAllProductCategories();

    return json({
      cart: cart.items(),
      categories,
      isCustomerWithData,
    });
  } catch (error) {
    getResponseError(error);
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
