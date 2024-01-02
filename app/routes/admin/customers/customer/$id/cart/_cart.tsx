import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { validationCartDelete } from "~/components/Admin/CartPanels/SingleCart/CartItemsList/Form";
import SingleCart from "~/components/Admin/CartPanels/SingleCart/SingleCart";
import { getCartByCustomerId } from "~/services/cart.server";
import { deleteCartItem } from "~/services/cartItem.server";
import { getCustomerById } from "~/services/customer.server";
import { NotFound, ValidationError } from "~/services/error.server";
import { getHTTPError } from "~/services/errorResponse.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const customerId = z.coerce.number().parse(params.id);
    const customer = await getCustomerById(customerId);
    const cart = await getCartByCustomerId(customerId);

    if (!customer) {
      throw new NotFound({ message: "Customer not found", code: 6004 });
    }
    if (!cart) {
      throw new NotFound({ message: "Cart not found", code: 7004 });
    }
    return json({ customer, cart });
  } catch (error) {
    getHTTPError(error);
  }
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    if (request.method === "DELETE") {
      const formData = await request.formData();
      const deleteData = await validationCartDelete.validate(formData);
      if (deleteData.error) {
        throw new ValidationError({
          message: "Error in delete cart item form",
          code: 8000,
        });
      }
      await deleteCartItem(deleteData.data.itemId);
      return json({ successes: true });
    }

    return json({ successes: false });
  } catch (error) {
    getHTTPError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();

  return <SingleCart customer={data.customer} cart={data.cart} />;
}
