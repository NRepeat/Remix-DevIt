import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import AdminPageLayout from "~/Layout/AdminPageLayout/AdminPageLayout";
import AdminError from "~/components/Errors/AdminError/AdminError";
import GlobalLoader from "~/components/Ui/GlobalLoading/GlobalLoader";
import { memberAuthenticator } from "~/services/adminAuth.server";
import { getResponseError } from "~/services/errorResponse.server";

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
    getResponseError(error);
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
