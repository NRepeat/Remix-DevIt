import type { LinksFunction } from "@remix-run/node";
import AdminPage from "~/pages/AdminPage/AdminPage";
import adminStylesHref from "../styles/adminStylesHref.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {}

export default function () {
  return (
    <div className="bg-admin-index">
      <AdminPage />
    </div>
  );
}
