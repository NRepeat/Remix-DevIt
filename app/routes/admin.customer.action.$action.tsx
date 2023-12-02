import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "~/services/customer.server";


export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const secondName = formData.get("secondName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const id = formData.get("id") as string
  const customerFormData = { name, secondName, email, password };
  const updatedCustomerFormData = { name, secondName, email }

  if (
    params.action === "create" &&
    name! &&
    secondName! &&
    email! &&
    password!
  ) {
    await createCustomer(customerFormData);
    return redirect('/admin/customers');
  } else if (params.action === "update") {
    await updateCustomer(parseInt(id),
      updatedCustomerFormData);
    return redirect('/admin/customers');
  } else if (params.action === "delete") {
    await deleteCustomer(parseInt(id));
    return redirect('/admin/customers');
  }
  return json({ success: true });
}
