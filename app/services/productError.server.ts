import { CustomError } from "./error.server";
type ProductCreateErrorArgs = {
  cause?: string;
  product?: string;
};
type ProductUpdateErrorArgs = {
  method: string;
  originalError: Error;
};
type ProductNotFoundErrorArgs = {
  method: string;
  originalError: Error;
};
type ProductDeleteErrorArgs = {
  originalError: Error;
};
export class ProductNotFoundError extends CustomError {
  method?: string;
  constructor({ method, originalError }: ProductNotFoundErrorArgs) {
    super(`Product not found for method ${method}`, originalError);
    this.method = method;
  }
}

export class ProductCreateError extends CustomError {
  cause?: string;
  product?: string;

  constructor({ cause, product }: ProductCreateErrorArgs) {
    super(`Error creating product`);
    this.cause = cause;
    this.product = product;
  }
}

export class ProductUpdateError extends CustomError {
  method: string;
  constructor({ method, originalError }: ProductUpdateErrorArgs) {
    super(`Error updating product. Method:${method}`, originalError);
    this.method = method;
  }
}

export class ProductDeleteError extends CustomError {
  constructor({ originalError }: ProductDeleteErrorArgs) {
    super(`Error deleting product.`, originalError);
  }
}
