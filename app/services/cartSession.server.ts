import type { Session } from "@remix-run/node";

export const SESSION_KEY = "cart";

export type SessionCart = {
  items: { productId: number; quantity: number }[];
  id: number;
};

export class Cart {
  // eslint-disable-next-line no-useless-constructor
  constructor(private session: Session) {}

  loadCart() {
    const cart: SessionCart = this.session.get(SESSION_KEY) ?? {
      id: null,
      items: [],
    };
    if (this.session.has("user")) {
      return cart;
    }

    return cart;
  }
  setCartId(id: number) {
    const cart = this.loadCart();

    cart.id = id;
    this.saveCart(cart);
  }
  saveCart(cart: SessionCart) {
    this.session.set(SESSION_KEY, cart);
  }

  addProduct(productId: number, quantity?: number) {
    console.log(
      "🚀 ~ file: cartSession.server.ts:36 ~ Cart ~ addProduct ~ quantity:",
      quantity
    );
    const cart = this.loadCart();

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );
    existingItem
      ? (existingItem.quantity += 1)
      : cart.items.push({ productId, quantity: quantity ?? 1 });

    this.saveCart(cart);
  }
  syncProducts(productId: number, quantity: number) {
    const cart = this.loadCart();

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );
    existingItem
      ? (existingItem.quantity = quantity)
      : cart.items.push({ productId, quantity });

    this.saveCart(cart);
  }
  removeProduct(productId: number) {
    const cart = this.loadCart();
    const indexToRemove = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (indexToRemove !== -1) {
      cart.items.splice(indexToRemove, 1);

      this.saveCart(cart);
    }
  }
  getId() {
    const cart = this.loadCart();
    return cart.id;
  }
  items() {
    const cart = this.loadCart();

    return cart.items;
  }
}

export const createCart = (session: Session) => new Cart(session);
