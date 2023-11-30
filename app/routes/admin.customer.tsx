import { ActionFunctionArgs } from "@remix-run/node";
import { createCart } from "~/services/cart.server";
import { createCustomer } from "~/services/customer.server";





export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData?.get("name") as string;
  const secondName = formData?.get("secondName") as string;
  const email = formData?.get("email") as string;
  const password = formData?.get("password") as string;

  if (name && secondName && email && password) {
    const userFormData = { name, secondName, email, password };
    const customer = await createCustomer(userFormData);
    const cart = await createCart(customer.id)
  }


  return {}
}




export default function () {
  return (
    <div>

    </div>
  );
}