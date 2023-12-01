import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import EditCustomerPanel from "~/components/Admin/CustomersPanels/EditCustomerPanel/EditCustomerPanel";

import { getCustomerById } from "~/services/customer.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const customer = await getCustomerById(parseInt(params.id!));
  return json({ customer });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Update Customer Data</h2>

      {data.customer?.name}
      <EditCustomerPanel customer={data.customer!} />
    </div>
  );
}
