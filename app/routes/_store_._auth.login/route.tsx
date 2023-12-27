import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import Header from "~/Layout/Header/Header";
import LoginPage from "~/Pages/LoginPage/LoginPage";
import StoreHeader from "~/components/Store/StoreHeader/Header";
import { customerAuthenticator } from "~/services/auth.server";
import { CustomAuthorizationError } from "~/services/error.server";
import { CustomResponse } from "~/services/responseError.server";
import { commitSession, getSession } from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await customerAuthenticator.authenticate("customer-auth", request, {
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
    const session = await getSession(request.headers.get("cookie"));
    const data = { error: session.get("authorizationError") };
    if (data.error) {
      const headers = new Headers({
        "Set-Cookie": await commitSession(session),
      });
      return json(data, {
        headers,
      });
    }

    const user = await customerAuthenticator.isAuthenticated(request);
    if (user) {
      return redirect("/");
    }
    return json({ user: false });
  } catch (error) {
    return new CustomResponse(
      { success: false, error: "Unauthorized " },
      { status: 401 }
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
      <LoginPage error={"error" in data ? data.error : false} />
    </>
  );
}
