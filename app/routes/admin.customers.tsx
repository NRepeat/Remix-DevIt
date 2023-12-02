import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomersPanel/CustomersPanel";
import { getAllCustomers, searchCustomer } from "~/services/customer.server";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");

  
  const customers = await searchCustomer(searchQuery!);
  return json({ customers });
}


export async function action({request, params}:ActionFunctionArgs){
console.log("🚀 ~ file: admin.customers.tsx:14 ~ action ~ params:", params)
console.log("🚀 ~ file: admin.customers.tsx:14 ~ action ~ request:", request)

// const  customers = await searchCustomer()

  return {}
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
