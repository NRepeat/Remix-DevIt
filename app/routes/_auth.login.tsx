import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import LoginPage from "~/pages/LoginPage/LoginPage";
import { login } from "~/services/customer.server";
import { loginSchema } from "~/utils/formValidation.server";

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const validatedCustomerData = await loginSchema.validate(formData);
  if (validatedCustomerData.error) {
    return validationError(validatedCustomerData.error);
  }

  const loggedCustomer = await login(validatedCustomerData);
  if ("error" in loggedCustomer) {
    return validationError({
      fieldErrors: {
        error: loggedCustomer.error,
        code: loggedCustomer.code,
      },
    });
  }
  return redirect("/products");
}

export default function () {
  return <LoginPage />;
}
