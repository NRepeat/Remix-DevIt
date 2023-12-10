import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import CreateCustomerPanel from "~/components/Admin/CustomersPanels/CreateCustomerPanel/CreateCustomerPanel";
import { createCustomer } from "~/services/customer.server";
import { validateStringTypeInFormData } from "~/utils/validation.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = validateStringTypeInFormData(formData.get("name"));
  const secondName = validateStringTypeInFormData(formData.get("secondName"));
  const email = validateStringTypeInFormData(formData.get("email"));
  const password = validateStringTypeInFormData(formData.get("password"));
  if (name && secondName && email && password) {
    try {
      await createCustomer({ name, secondName, email, password });
      return redirect("/admin/customers");
    } catch (error) {
      throw new Response("Invalid input for creating a customer");
    }
  }
  return json({ success: false });
}

export default function () {
  return <CreateCustomerPanel />;
}
