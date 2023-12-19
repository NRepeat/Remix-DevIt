import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import LoginPage from "~/Pages/LoginPage/LoginPage";
import LoginError from "~/components/Errors/LoginError /LoginError";
import { customerAuthenticator } from "~/services/auth.server";
import { existCustomer } from "~/services/customer.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await customerAuthenticator.authenticate("customer-auth", request, {
      successRedirect: "/products",
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
    const user = await customerAuthenticator.isAuthenticated(request);
    if (!user) {
      return null;
    }
    const isCustomer = await existCustomer(user.email);
    if (!isCustomer) {
      throw new Error("You don't have permission to access");
    }
    return redirect("/login");
  } catch (error) {
    throw new Response(`${error}`);
  }
}
export function ErrorBoundary() {
  return <LoginError />;
}

export default function () {
  return <LoginPage />;
}
