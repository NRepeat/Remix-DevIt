import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { deleteCustomer } from "~/services/customer.server";
import { validateNumberTypeInFormData } from "~/utils/validation.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = validateNumberTypeInFormData(formData.get("id"));
  if (id) {
    try {
      await deleteCustomer(id);
      return redirect("/admin/customers");
    } catch (error) {
      throw new Response("Invalid customer ID for delete");
    }
  }
  return json({ success: false });
}
