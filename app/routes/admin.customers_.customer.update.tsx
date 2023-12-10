import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { updateCustomer } from "~/services/customer.server";
import {
  validateNumberTypeInFormData,
  validateStringTypeInFormData,
} from "~/utils/validation.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = validateStringTypeInFormData(formData.get("name"));
  const secondName = validateStringTypeInFormData(formData.get("secondName"));
  const email = validateStringTypeInFormData(formData.get("email"));
  const id = validateNumberTypeInFormData(formData.get("id"));
  if (id && name && secondName && email) {
    try {
      await updateCustomer(id, { name, secondName, email });

      return redirect("/admin/customers");
    } catch (error) {
      throw new Response("Invalid input for updating a customer");
    }
  }
  return json({ success: false });
}
