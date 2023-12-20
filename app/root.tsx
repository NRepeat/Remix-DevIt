import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import PageLayout from "./Layout/PageLayout/PageLayout";
import NotFoundPageError from "./components/Errors/NotFoundPage/NotFoundPageError";
import GlobalLoader from "./components/Ui/GlobalLoading/GlobalLoader";
import { customerAuthenticator } from "./services/auth.server";
import { createCart } from "./services/cartSession.server";
import {
  getAllProductCategories,
  getAllProducts,
} from "./services/product.server";
import { getSession } from "./services/session.server";
import globalStylesHref from "./styles/global.css";
import resetStylesHref from "./styles/reset.css";
import { parseAndValidateNumber } from "./utils/validation.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStylesHref },
  { rel: "stylesheet", href: globalStylesHref },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const isCustomerAuthenticated =
    !!(await customerAuthenticator.isAuthenticated(request));
  const cart = createCart(session);
  const url = new URL(request.url);
  const pageQuery = url.searchParams.get("page");
  const sort = url.searchParams.get("sort");
  const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;
  const categories = await getAllProductCategories();
  const products = await getAllProducts(page, sort);
  return json({
    products,
    page,
    cart: cart.items(),
    categories,
    isCustomerAuthenticated,
  });
};

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bodyError">
        <GlobalLoader isAdmin={false} />
        <NotFoundPageError />
      </body>
    </html>
  );
}

export default function App() {
  const nav = useLocation();
  let isAdmin = true;
  nav.pathname.includes("/admin") ? (isAdmin = true) : (isAdmin = false);
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
        <GlobalLoader isAdmin={isAdmin} />
        <PageLayout data={data} isAdmin={false}>
          <Outlet />
        </PageLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
