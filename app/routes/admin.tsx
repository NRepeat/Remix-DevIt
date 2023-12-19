import {
  redirect,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import AdminPage from "~/Pages/AdminPage/AdminPage";
import AdminError from "~/components/Errors/AdminError/AdminError";
import { memberAuthenticator } from "~/services/adminAuth.server";
import adminStylesHref from "../styles/adminStylesHref.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {
  return <AdminError />;
}
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await memberAuthenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/admin/login");
  }
  return null;
}
export default function () {
  return (
    <div className="bg-admin-index">
      <AdminPage />
    </div>
  );
}
