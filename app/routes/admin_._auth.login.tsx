import { json, type ActionFunctionArgs } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import Login from "~/components/Admin/Auth/Login/Login";
import { authenticator } from "~/services/adminAuth.server";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate("member-auth", request, {
      successRedirect: "/admin",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof AuthorizationError) {
      return validationError({
        fieldErrors: { password: `Email or password are incorrect` },
      });
    }
  }
  return json({ s: true });
}

export default function () {
  return (
    <>
      <Login />
    </>
  );
}
