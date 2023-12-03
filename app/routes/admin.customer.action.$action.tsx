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
  const id = formData.get("id") as string;

  if (params.action === "create" && name && secondName && email && password) {
    await createCustomer({ name, secondName, email, password });
    return redirect('/admin/customers');
  } else if (params.action === "update" && id && name && secondName && email) {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)) {
      await updateCustomer(parsedId, { name, secondName, email });
      return redirect('/admin/customers');
    } else {
      return json({ error: "Invalid customer ID for update" });
    }
  } else if (params.action === "delete" && id) {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)) {
      await deleteCustomer(parsedId);
      return redirect('/admin/customers');
    } else {
      return json({ error: "Invalid customer ID for delete" });
    }
  }

  return json({ success: true });
}
