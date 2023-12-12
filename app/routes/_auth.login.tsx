import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import LoginPage from "~/pages/LoginPage/LoginPage";
import { existCustomer, login } from "~/services/customer.server";
import { loginSchema } from "~/utils/formValidation";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const formData = Object.fromEntries(await request.formData());

    const validatedCustomerData = await loginSchema.validate(formData);
    if (validatedCustomerData.error) {
      return validationError(validatedCustomerData.error);
    }
    const isExistCustomer = await existCustomer(
      validatedCustomerData.data.email
    );
    if (isExistCustomer) {
      const isCustomerLogged = await login(validatedCustomerData);
      if (isCustomerLogged) {
        return redirect("/products");
      }
      return json({ error: "Email or password incorrect" });
    }
    return json({ error: "Email or password incorrect" });
  } catch (error) {
    throw new Response(`Error while login customer${error}`);
  }
}

export default function () {
  const actionData = useActionData<typeof action>();
  return <LoginPage actionData={actionData} />;
}
