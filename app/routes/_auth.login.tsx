import { redirect, type ActionFunctionArgs } from "@remix-run/node";
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
      return validationError({
        fieldErrors: {
          email: "Email or password incorrect",
          password: "Email or password incorrect",
        },
      });
    }
    return validationError({
      fieldErrors: {
        email: "Email or password incorrect",
        password: "Email or password incorrect",
      },
    });
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

export default function () {
  return <LoginPage />;
}
