import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomerPanel/CustomersPanel";
import { searchCustomer } from "~/services/customer.server";

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
export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <CustomersPanel
      customers={data.customers.customers}
      totalPages={data.customers.totalPages}
      currentPage={data.page}
    />
  );
}
