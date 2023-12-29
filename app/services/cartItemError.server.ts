import { CustomError } from "./error.server";

export class CartItemDeleteError extends CustomError {
  constructor(error: Error) {
    super(`Error deleting customer.`, error);
  }
}

export class CartCreateError extends CustomError {
  constructor(error: Error) {
    super(`Error create cart.`, error);
  }
}
