import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomerPanel/CustomersPanel";
import {searchCustomer } from "~/services/customer.server";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  if (searchQuery === '') {
    return redirect('/admin/customers');
  }
  const pageQuery = url.searchParams.get("page");
  const page = pageQuery ? parseInt(pageQuery) : 1;
  const customers = await searchCustomer(searchQuery!,page);
  if (!customers) {
    throw new Response("Customers Not Found", { status: 404 });
  }
  return json({ customers });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="customersPanelContainer">
      <CustomersPanel data={data} />
      <Outlet />
    </div>
  );
}
