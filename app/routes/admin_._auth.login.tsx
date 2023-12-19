import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import Login from "~/components/Admin/Auth/Login/Login";
import LoginError from "~/components/Errors/AdminError/Login/LoginError";
import { memberAuthenticator } from "~/services/adminAuth.server";
import { findMember } from "~/services/member.server";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    return await memberAuthenticator.authenticate("member-auth", request, {
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
  return json({ success: true });
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user = await memberAuthenticator.isAuthenticated(request);
    if (!user) {
      throw new Error("You aren't logged in");
    }
    const isMember = await findMember({ email: user.email });
    if (!isMember) {
      throw new Error("You don't have permission to access");
    }
    return redirect("/admin");
  } catch (error) {
    throw new Response(`${error}`);
  }
}

export function ErrorBoundary() {
  return (
    <>
      <LoginError />
    </>
  );
}

export default function () {
  return <Login />;
}
