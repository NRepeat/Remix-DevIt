import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import AdminPageLayout from "~/Layout/AdminPageLayout/AdminPageLayout";
import AdminError from "~/components/Errors/AdminError/AdminError";
import GlobalLoader from "~/components/Ui/GlobalLoading/GlobalLoader";
import { memberAuthenticator } from "~/services/adminAuth.server";
import {
  InternalServerResponse,
  UnauthorizedResponse,
} from "~/services/responseError.server";

export function ErrorBoundary() {
  return <AdminError />;
}
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user = await memberAuthenticator.isAuthenticated(request);
    if (!user) {
      return redirect("/admin/login");
    }
    return json({ user });
  } catch (error) {
    if (error instanceof Error) {
      return new UnauthorizedResponse(error);
    }
    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
  }
}
export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <AdminPageLayout member={data.user}>
      <GlobalLoader isAdmin />
      <Outlet />
    </AdminPageLayout>
  );
}
