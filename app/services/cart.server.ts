import { Session } from "@remix-run/node";

export const SESSION_KEY = "cart";

export type SessionCart = {
  [key: string | number]: number;
};

export class Cart {
  constructor(private session: Session) {}
  loadCart() {
    const cart: SessionCart = this.session.get(SESSION_KEY) ?? {};

    return cart;
  }
  saveCart(cart: SessionCart) {
    this.session.set(SESSION_KEY, cart);
  }
 
  addProduct(productId: string | number, quantity: string) {
    const cart = this.loadCart();

    const error = this.session.get("error") ?? {};

    if (cart[productId] + 1 > +quantity) {
      this.session.flash("error", "Out of stock");
      return
    }
    cart[productId] = (cart[productId] ?? 0) + 1;

    this.saveCart(cart);
  }

  removeProduct(productId: string | number) {
    const cart = this.loadCart();
    delete cart[productId];
    this.saveCart(cart);
  }
  items() {
    Object.entries(this.loadCart());
 
    return Object.entries(this.loadCart()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }
}

export const createCart = (session: Session) => new Cart(session);
