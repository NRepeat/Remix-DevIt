import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import LoginPage from "~/Pages/LoginPage/LoginPage";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const user = await authenticator.authenticate("user-pass", request, {
      throwOnError: true,
    });
    let session = await getSession(request.headers.get("Cookie"));
    console.log("🚀 ~ file: _auth.login.tsx:15 ~ action ~ session:", session);
    session.set(authenticator.sessionKey, user);
    let headers = new Headers({ "Set-Cookie": await commitSession(session) });

    return redirect("/products", { headers });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      throw new Response(`${error.message}`);
    }
    throw new Response("Authorization error", { status: 500 });
  }
}
export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/products",
  });

  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <LoginPage error={error.data} />
      </>
    );
  }
}
export default function () {
  return <LoginPage />;
}
