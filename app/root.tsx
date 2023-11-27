import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, LoaderFunctionArgs, type LinksFunction } from "@remix-run/node";
import { getSession } from "./services/session.server";
import { createCart } from "./services/cart.server";
import { getAllProductCategories } from "./services/product.server";
import StorePage from "./pages/StorePage/StorePage";
import resetlStylesHref from "./styles/reset.css";
import globalStylesHref from "./styles/global.css";
import NotFoundPageError from "./components/Errors/NotFoundPage/NotFoundPageError";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetlStylesHref },
  { rel: "stylesheet", href: globalStylesHref },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  const categories = await getAllProductCategories();
  return json({ cart: cart.items(), categories });
};
export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bodyError">
        <NotFoundPageError />
        <Outlet/>
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="body">
        <StorePage data={data} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
