import { Session } from "@remix-run/node";

export const SESSION_KEY = "cart";

export type SessionCart = {
  [key: string | number]: number;
  
};

export class Cart {
  constructor(private session: Session) {
  }
  loadCart() {
   const cart:SessionCart =  this.session.get(SESSION_KEY) ?? {}
    return  cart;
  }
  saveCart(cart: SessionCart) {
    this.session.set(SESSION_KEY, cart);
  }
  addProduct(productId: string | number) {
    const cart = this.loadCart();
    cart[productId] = (cart[productId] ?? 0) + 1;
    this.saveCart(cart);
  }
  removeProduct(productId: string | number) {
    const cart = this.loadCart();
    delete cart[productId];
    this.saveCart(cart);
  }
  items() {
    Object.entries(this.loadCart())
    console.log("🚀 ~ file: cart.server.ts:35 ~ Cart ~ items ~ Object.entries(this.loadCart()):", Object.entries(this.loadCart()))
    return Object.entries(this.loadCart()).map(([productId,quantity]) => ({productId,quantity}));
  }
}

export const createCart = (session: Session) => new Cart(session);
