import { CustomError } from "./error.server";

export class ProductCreateError extends CustomError {
  constructor(message = "Product not created", error?: unknown) {
    super({ message });
  }
}
export class ProductUpdateError extends CustomError {
  constructor(message = "Product not updated", error?: unknown) {
    super({ message });
  }
}
export class ProductDeleteError extends CustomError {
  constructor(message = "Product not deleted", error?: unknown) {
    super({ message });
  }
}

export class ProductNotFound extends CustomError {
  constructor(message = "Product not found", error?: unknown) {
    super({ message });
  }
}
