import { CustomError } from "./error.server";

export class CartCreateError extends CustomError {
  constructor(message = "Cart not created", error?: unknown) {
    super({ message });
  }
}
export class CartUpdateError extends CustomError {
  constructor(message = "Cart not updated", error?: unknown) {
    super({ message });
  }
}
export class CartDeleteError extends CustomError {
  constructor(message = "Cart not deleted", error?: unknown) {
    super({ message });
  }
}

export class CartNotFound extends CustomError {
  constructor(message = "Cart not found", error?: unknown) {
    super({ message });
  }
}
