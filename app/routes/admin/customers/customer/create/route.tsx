import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import CreateCustomerPanel from "~/components/Admin/CustomersPanels/CreateCustomerPanel/CreateCustomerPanel";
import { createCustomer, existCustomer } from "~/services/customer.server";
import { CustomerCreateError } from "~/services/customerError.server";
import { InternalServerResponse } from "~/services/responseError.server";
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
    if (error instanceof CustomerCreateError) {
      throw new InternalServerResponse(
        { success: false, error: "Error while creating customer " },
        { status: 500 }
      );
    }
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

export default function () {
  return <CreateCustomerPanel />;
}