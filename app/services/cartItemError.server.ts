import { CustomError } from "./error.server";

export class CartItemCreateError extends CustomError {
  constructor(message = "CartItem not created", error?: unknown) {
    super({ message });
  }
}
export class CartItemUpdateError extends CustomError {
  constructor(message = "CartItem not updated", error?: unknown) {
    super({ message });
  }
}
export class CartItemDeleteError extends CustomError {
  constructor(message = "CartItem not deleted", error?: unknown) {
    super({ message });
  }
}

export class CartItemNotFound extends CustomError {
  constructor(message = "CartItem not found", error?: unknown) {
    super({ message });
  }
}
