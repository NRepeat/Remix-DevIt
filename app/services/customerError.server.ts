import { CustomError } from "./error.server";

export class CustomerCreateError extends CustomError {
  constructor(message = "Customer not created", error?: unknown) {
    super({ message });
  }
}
export class CustomerUpdateError extends CustomError {
  constructor(message = "Customer not updated", error?: unknown) {
    super({ message });
  }
}
export class CustomerDeleteError extends CustomError {
  constructor(message = "Customer not deleted", error?: unknown) {
    super({ message });
  }
}

export class CustomerNotFound extends CustomError {
  constructor(message = "Customer not found", error?: unknown) {
    super({ message });
  }
}

export class CustomerAuthenticationError extends CustomError {
  constructor(message = "Customer authentication error", error?: unknown) {
    super({ message });
  }
}
