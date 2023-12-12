import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import CreateCustomerPanel from "~/components/Admin/CustomersPanels/CreateCustomerPanel/CreateCustomerPanel";
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
        fieldErrors: { email: "Email or password incorrect" },
      });
    }
    await createCustomer(validatedCustomerData);

    return redirect("/admin/customers");
  } catch (error) {
    throw new Response(`Error while registration customer${error}`);
  }
}

export default function () {
  return <CreateCustomerPanel />;
}
