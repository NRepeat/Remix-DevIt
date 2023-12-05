import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EditCustomerPanel from "~/components/Admin/CustomersPanels/EditCustomerPanel/EditCustomerPanel";
import { getCustomerById } from "~/services/customer.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const customer = await getCustomerById(parseInt(params.id!));
  if (!customer) {
    throw new Response("Customer Not Found", { status: 404 });
  }
  return json({ customer });
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="containerBase">
      <EditCustomerPanel customer={data.customer!} />
    </div>
  );
}
