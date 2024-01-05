import { isProductInStock } from "~/utils/validation.server";
import {
  CartItemCreateError,
  CartItemDeleteError,
  CartItemNotFound,
  CartItemUpdateError,
} from "./cartItemError.server";

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
    throw new CartItemCreateError();
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
    throw new CartItemNotFound();
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
    throw new CartItemUpdateError();
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id },
    });
    return deletedCartItem;
  } catch (error) {
    throw new CartItemDeleteError();
  }
};
