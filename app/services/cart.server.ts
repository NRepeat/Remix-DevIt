import type { Cart } from "@prisma/client";

export const createCart = async (id: number): Promise<Cart> => {
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
    throw new Error("Error while attempting to create new cart");
  }
};

export const getCartByCustomerId = async (id: number) => {
  try {
    if (!id) {
      throw new Error("Missing cart id");
    }
    const cart = await prisma.cart.findUnique({
      where: { customerId: id },
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
    throw new Error("Error while attempting to find cart by id");
  }
};

export const getCartById = async (cartId: number) => {
  try {
    if (!cartId) {
      throw new Error("Missing cart id");
    }
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
    throw new Error("Error while attempting to find cart by id");
  }
};
export const updateCart = async (cartId: number, newData: any) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) {
      throw new Error(`Cart with ID ${cartId} not found for update`);
    }
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: newData,
    });
    return updatedCart;
  } catch (error) {
    throw new Error(`Error while attempting to update cart: ${error}`);
  }
};

export const deleteCart = async (cartId: number) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) {
      throw new Error(`Cart with ID ${cartId} not found for deletion`);
    }
    const deletedCart = await prisma.cart.delete({
      where: { id: cartId },
    });
    return deletedCart;
  } catch (error) {
    throw new Error(`Error while attempting to delete cart: ${error}`);
  }
};
