import { CustomError } from "./error.server";
type CustomerNotFoundErrorArgs = {
  method: string;
  error: Error;
};

export class CustomerNotFoundError extends CustomError {
  method?: string;
  constructor({ method, error }: CustomerNotFoundErrorArgs) {
    super(`Customer not found `, error);
    this.method = method;
  }
}

export class CustomerDeleteError extends CustomError {
  constructor(error: Error) {
    super(`Error deleting customer.`, error);
  }
}

export class CustomerUpdateError extends CustomError {
  constructor(error: Error) {
    super(`Error updating customer.`, error);
  }
}
export class CustomerCreateError extends CustomError {
  constructor(error: Error) {
    super(`Error create customer.`, error);
  }
}
