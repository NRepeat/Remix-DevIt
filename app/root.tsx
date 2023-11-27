import { Links, Meta, Outlet, Scripts, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, LoaderFunctionArgs, type LinksFunction } from "@remix-run/node";
import { getSession } from "./services/session.server";
import { createCart } from "./services/cart.server";
import { getAllProductCategories } from "./services/product.server";
import StorePage from "./pages/StorePage/StorePage";
import resetlStylesHref from "./styles/reset.css";
import globalStylesHref from "./styles/global.css";

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

  if (isRouteErrorResponse(error)) {
    return (
      <div>
      <h1>Error</h1>
      <p>{error.data}</p>
      <p>The status is:</p>
      <pre>{error.status}</pre>
    </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
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
      </body>
    </html>
  );
}
