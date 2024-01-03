import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import Header from "~/Layout/Header/Header";
import RegistrationPage from "~/Pages/RegistrationPage/RegistrationPage";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import { customerAuthenticator } from "~/services/auth.server";
import { CustomAuthorizationError } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await customerAuthenticator.authenticate("customer-reg", request, {
      successRedirect: "/",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      if (error.cause instanceof CustomAuthorizationError) {
        if (error.cause.fieldErrors)
          return validationError({
            fieldErrors: error.cause.fieldErrors,
          });
      }
      return validationError({
        fieldErrors: { email: error.message },
      });
    }
    return error;
  }
}
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user = await customerAuthenticator.isAuthenticated(request);
    if (user) {
      return redirect("/");
    }
    return json({ user });
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header>
        <StoreHeader customer={data.user} />
      </Header>
      <RegistrationPage />
    </>
  );
}
