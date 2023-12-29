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
import { InternalServerResponse } from "~/services/responseError.server";

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
    return json({ user: false });
  } catch (error) {
    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header>
        <StoreHeader customer={"user" in data ? data.user : false} />
      </Header>
      <RegistrationPage />
    </>
  );
}
