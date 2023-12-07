import type { LinksFunction } from "@remix-run/node";
import AdminPage from "~/pages/AdminPage/AdminPage";
import adminStylesHref from "../styles/admin.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {}

export default function () {
  return <AdminPage />;
}
