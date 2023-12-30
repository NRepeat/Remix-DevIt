import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createCart } from "~/services/cart.server";
import { CartCreateError } from "~/services/cartItemError.server";
import { InternalServerResponse } from "~/services/responseError.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export async function action({ params }: ActionFunctionArgs) {
  try {
    invariant(params.id);
    if (params.id) {
      await createCart(parseAndValidateNumber(params.id));
      redirect("/admin/customers");
    }
  } catch (error) {
    if (error instanceof CartCreateError) {
      throw new InternalServerResponse(
        { success: false, error: "Error while creating cart" },
        { status: 500 }
      );
    }
    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
  }
}
