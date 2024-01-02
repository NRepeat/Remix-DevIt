import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SingleProductLayout } from "~/Layout/StoreSingleProductLayout/SingleProductLayout";
import { customerAuthenticator } from "~/services/auth.server";
import { getHTTPError } from "~/services/errorResponse.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const customer = await customerAuthenticator.isAuthenticated(request);
    return json({ customer });
  } catch (error) {
    getHTTPError(error);
  }
}

export function ProductRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <SingleProductLayout customer={data.customer}>
      <Outlet />
    </SingleProductLayout>
  );
}

export default ProductRoute;
