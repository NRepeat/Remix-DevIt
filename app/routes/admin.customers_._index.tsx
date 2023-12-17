import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomerPanel/CustomersPanel";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import { SearchBar } from "~/components/SearchBar/SearchBar";
import Pagination from "~/components/Store/Pagination/Pagination";
import { searchCustomer } from "~/services/customer.server";
import adminCustomersStylesHref from "../styles/adminCustomersStylesHref.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminCustomersStylesHref },
];
export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search");
    if (searchQuery === "") {
      return redirect("/admin/customers");
    }
    const pageQuery = url.searchParams.get("page");
    const page = pageQuery ? parseInt(pageQuery) : 1;
    const customers = await searchCustomer(searchQuery, page);
    return json({ customers, page });
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    <div>
      <h2>{error.status}</h2>
      <p>{error.data}</p>
      <p>We are already working on fixing it</p>
    </div>;
  }
  return (
    <div>
      <h1>Error</h1>
      <p>We are already working on fixing it</p>
    </div>
  );
}

const breadcrumbs = [{ label: "Customers", link: "/admin/customers" }];
export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="breadcrumbs-container">
        <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />
      </div>
      <div className="search">
        <SearchBar action="/admin/customers/" />
        <Link className="link" to={"/admin/customers/customer/create"}>
          Create customer
        </Link>
      </div>
      <CustomersPanel customers={data.customers.customers} />
      <div className="pagination-container">
        <Pagination
          admin={true}
          currentPage={data.page}
          totalPages={data.customers.totalPages}
        />
      </div>
    </>
  );
}
