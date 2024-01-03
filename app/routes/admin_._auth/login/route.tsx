import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import Login from "~/components/Admin/Auth/Login/Login";
import { memberAuthenticator } from "~/services/adminAuth.server";
import { CustomAuthorizationError } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await memberAuthenticator.authenticate("member-auth", request, {
      successRedirect: "/admin",
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
    const user = await memberAuthenticator.isAuthenticated(request);
    if (!user) {
      return json({ error: "Unauthorized" });
    }
    return redirect("/admin/customers");
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <Login error={data.error} />;
}
