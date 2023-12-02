import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomersPanel/CustomersPanel";
import { getAllCustomers } from "~/services/customer.server";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const customers = await getAllCustomers();
  return json({ customers });
}




export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <CustomersPanel customers={data.customers} />
      <Outlet />
    </>
  );
}
