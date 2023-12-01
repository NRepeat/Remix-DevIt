import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import AdminPage from "~/pages/AdminPage/AdminPage";
import { getAllCustomers } from "~/services/customer.server";


export async function loader({request,params}: LoaderFunctionArgs) {
  const customers = await getAllCustomers();
  return json({ customers })
}


export default function () {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <Sidebar />
      <AdminPage customers={data.customers}/>
      <Outlet/>
    </div>
  );
}