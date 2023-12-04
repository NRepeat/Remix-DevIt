import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "~/services/customer.server";

const parseAndValidateInt = (value: FormDataEntryValue | null | undefined): number | null => {
  const parsedValue = parseInt(String(value));
  return !isNaN(parsedValue) ? parsedValue : null;
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const secondName = formData.get("secondName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const id = formData.get("id") as string;
  const parsedId = parseAndValidateInt(id);

  switch (params.action) {
    case "create":
      if (name && secondName && email && password) {
        await createCustomer({ name, secondName, email, password });
        return redirect("/admin/customers");
      } else {
        return json({ error: "Invalid input for creating a customer" });
      }

    case "update":
      if (parsedId !== null && name && secondName && email) {
        await updateCustomer(parsedId, { name, secondName, email });
        return redirect("/admin/customers");
      } else {
        return json({ error: "Invalid input for updating a customer" });
      }

    case "delete":
      if (parsedId !== null) {
        await deleteCustomer(parsedId);
        return redirect("/admin/customers");
      } else {
        return json({ error: "Invalid customer ID for delete" });
      }

    default:
      return json({ success: true });
  }
}
