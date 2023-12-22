import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import RegistrationPage from "~/Pages/RegistrationPage/RegistrationPage";
import { customerAuthenticator } from "~/services/auth.server";
import { CustomAuthorizationError } from "~/services/error.server";

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
  }
  return json({ success: true });
}

export default function () {
  return <RegistrationPage />;
}
