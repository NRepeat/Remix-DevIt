import type { ActionFunctionArgs } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import RegistrationPage from "~/Pages/RegistrationPage/RegistrationPage";
import { authenticator } from "~/services/auth.server";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate("user-reg", request, {
      successRedirect: "/products",
      failureRedirect: "/registration",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      throw new Error("Registration error");
    }
    throw new Response("Registration error", { status: 500 });
  }
}

export default function () {
  return <RegistrationPage />;
}
