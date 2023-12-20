import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import LoginPage from "~/Pages/LoginPage/LoginPage";
import { customerAuthenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await customerAuthenticator.authenticate("customer-auth", request, {
      successRedirect: "/",
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
    const session = await getSession(request.headers.get("cookie"));
    const data = { error: session.get("error") };
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
    return null;
  } catch (error) {
    throw new Response(`${error}`);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <LoginPage error={data?.error} />;
}
