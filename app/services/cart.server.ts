import type { Cart, CartItem, Product } from "@prisma/client";
import { CartError } from "./error.server";

export const createCart = async (id?: number): Promise<Cart> => {
  try {
    const existCart = await prisma.cart.findFirst({
      where: { customerId: id },
    });

    if (existCart) {
      return existCart;
    }
    if (!id) {
      const newCart = await prisma.cart.create({
        data: {},
      });
      return newCart;
    }
    const newCart = await prisma.cart.create({
      data: {
        customerId: id,
      },
    });
    return newCart;
  } catch (error) {
    throw new CartError({
      message: "Error while attempting to create new cart",
    }).create();
  }
};

export const getCartByCustomerId = async (
  id: number
): Promise<
  (Cart & { cartItems: CartItem[] & { product: Product }[] }) | null
> => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { customerId: id },
      include: {
        cartItems: {
          include: {
            product: true,
          },
          orderBy: { productId: "asc" },
        },
      },
    });

    return cart;
  } catch (error) {
    throw new CartError({
      message: "Error while attempting to find cart by id",
    }).notFound();
  }
};

export const getCartById = async (cartId: number) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        customer: true,
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return cart;
  } catch (error) {
    throw new CartError({
      message: "Error while attempting to find cart by id",
    }).notFound();
  }
};
export const updateCart = async (cartId: number, newData: any) => {
  try {
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: newData,
    });
    return updatedCart;
  } catch (error) {
    throw new CartError({
      message: `Error while attempting to update cart`,
    }).update();
  }
};

export const deleteCart = async (cartId: number) => {
  try {
    const deletedCart = await prisma.cart.delete({
      where: { id: cartId },
    });
    return deletedCart;
  } catch (error) {
    throw new CartError({
      message: `Error while attempting to delete cart`,
    });
  }
};
