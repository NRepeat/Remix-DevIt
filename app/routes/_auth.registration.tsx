import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import RegistrationPage from "~/pages/RegistrationPage/RegistrationPage";
import { createCustomer, existCustomer } from "~/services/customer.server";
import { registrationSchema } from "~/utils/formValidation";

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const formData = Object.fromEntries(await request.formData());

    const validatedCustomerData = await registrationSchema.validate(formData);
    if (validatedCustomerData.error) {
      return validationError(validatedCustomerData.error);
    }
    const isExistCustomer = await existCustomer(
      validatedCustomerData.data.email
    );
    if (isExistCustomer) {
      return validationError({
        fieldErrors: {
          email: "This email already exist",
        },
      });
    }
    await createCustomer(validatedCustomerData);

    return redirect("/products");
  } catch (error) {
    throw new Response(`Error while registration customer${error}`);
  }
}

export default function () {
  const actionData = useActionData<typeof action>();
  return <RegistrationPage actionData={actionData} />;
}
