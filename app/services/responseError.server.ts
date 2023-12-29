import type { NotFoundError } from "./error.server";

type ResponseData = {
  success: boolean;
  error?: string;
};
type NotFoundResponseArgs = {
  error: NotFoundError;
};

export class NotFoundSingleProductPage extends Response {
  statusText: string;
  constructor(message: string) {
    super("Product Page", { status: 404 });
    this.statusText = message;
  }
}

export class NotFoundResponse extends Response {
  constructor(data: NotFoundResponseArgs, options?: ResponseInit) {
    options = options || {};
    options.status = options.status || 404;
    options.statusText = data.error.message;
    super(JSON.stringify(data), options);
  }
}

export class InternalServerResponse extends Response {
  success: boolean;
  data: ResponseData;
  options: ResponseInit;

  constructor(data: ResponseData, options: ResponseInit) {
    super(JSON.stringify(data), options);
    this.success = data.success;
    this.data = data;
    this.options = options;
  }
}

export class UnauthorizedResponse extends Response {
  constructor(error: Error, options?: ResponseInit) {
    options = options || {};
    options.status = options.status || 401;
    options.statusText = error.message;
    super(JSON.stringify(error), options);
  }
}
