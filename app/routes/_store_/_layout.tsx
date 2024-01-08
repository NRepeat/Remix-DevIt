import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "react-router";
import Footer from "~/Layout/Footer/Footer";
import Header from "~/Layout/Header/Header";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import { customerAuthenticator } from "~/services/auth.server";
import { getResponseError } from "~/services/errorResponse.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const customer = await customerAuthenticator.isAuthenticated(request);
    return json({ customer });
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header>
        <StoreHeader customer={data.customer} />
      </Header>
      <Outlet />
      <Footer />
    </>
  );
}
