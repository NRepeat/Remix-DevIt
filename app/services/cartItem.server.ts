import { isProductInStock } from "~/utils/validation.server";
import { CartItemError } from "./error.server";

export interface CartItemArgs {
  cartId: number;
  quantity: number;
  externalId: number;
}

export const createCartItem = async ({
  cartId,
  externalId,
  quantity,
}: CartItemArgs) => {
  try {
    const existCartItem = await getCartItemById(cartId);
    if (existCartItem) {
      const updatedCartItem = await updateCartItem(existCartItem.id, quantity);
      return updatedCartItem;
    }
    if (await isProductInStock(externalId, quantity)) {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId: externalId,
          quantity,
        },
      });

      return newCartItem;
    }
  } catch (error) {
    throw new CartItemError({
      message: `Failed to create/update cart item ${error}`,
    }).create();
  }
};

export const getCartItemById = async (cartItemId: number) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    });
    return cartItem;
  } catch (error) {
    throw new CartItemError({
      message: "Failed to get cart item by ID",
    }).notFound();
  }
};
export const updateCartItem = async (id: number, newData: number) => {
  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity: newData },
    });
    return updatedCartItem;
  } catch (error) {
    throw new CartItemError({
      message: `Error while updating cart item `,
    }).update();
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id },
    });
    return deletedCartItem;
  } catch (error) {
    throw new CartItemError({
      message: `Error while deleting cart item `,
    }).delete();
  }
};
