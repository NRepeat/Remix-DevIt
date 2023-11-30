import { Cart } from "@prisma/client";

export const createCart = async (customerId: number): Promise<Cart> => {
  const newCart = await prisma.cart.create({
    data: {
      customerId,
    },
  });
  return newCart;
};
export interface CartItemArgs {
  cartId: number;
  productId: number;
  quantity: number;
}

export const getCartById = async (cartId: number) => {
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
};
export const updateCart = async (cartId: number, newData: any) => {
  const updatedCart = await prisma.cart.update({
    where: { id: cartId },
    data: newData,
  });
  return updatedCart;
};

export const deleteCart = async (cartId: number) => {
  const deletedCart = await prisma.cart.delete({
    where: { id: cartId },
  });
  return deletedCart;
};
export const createCartItem = async ({
  cartId,
  productId,
  quantity,
}: CartItemArgs) => {
  const existCartItem =  await prisma.cartItem.findFirst({
    where: { productId },
  });

  if (!existCartItem) {
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
    return newCartItem;
  }
  const updatedCartItem = updateCartItem(existCartItem.id,quantity)
};

export const getCartItemById = async (cartItemId: number) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: {
      cart: true,
      product: true,
    },
  });
  return cartItem;
};
export const updateCartItem = async (cartItemId: number, newData: any) => {
  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: {quantity:newData},
  });
  return updatedCartItem;
};

export const deleteCartItem = async (cartItemId: number) => {
  const deletedCartItem = await prisma.cartItem.delete({
    where: { id: cartItemId },
  });
  return deletedCartItem;
};
