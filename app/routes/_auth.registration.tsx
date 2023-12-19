import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import RegistrationPage from "~/Pages/RegistrationPage/RegistrationPage";
import { customerAuthenticator } from "~/services/auth.server";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    return await customerAuthenticator.authenticate("customer-reg", request, {
      successRedirect: "/",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof AuthorizationError) {
      return validationError({
        fieldErrors: { password: `Not valid data` },
      });
    }
  }
  return json({ success: true });
}

export default function () {
  return <RegistrationPage />;
}
