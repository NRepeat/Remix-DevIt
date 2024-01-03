import type { HttpError } from "http-errors";
import createHttpError from "http-errors";

export class BadRequest {
  httpError: createHttpError.HttpError<400>;

  constructor(message: string) {
    this.httpError = createHttpError(400, { message });
  }
}
export function BadRequests(message: string): HttpError {
  return createHttpError(400, { message });
}
export class UnauthorizedError {
  httpError: createHttpError.HttpError<401>;

  constructor(message: string) {
    this.httpError = createHttpError(401, { message });
  }
}
export class SessionError {
  httpError: createHttpError.HttpError<401>;

  constructor(message: string) {
    this.httpError = createHttpError(401, { message });
  }
}
export class ForbiddenError {
  httpError: createHttpError.HttpError<403>;

  constructor(message: string) {
    this.httpError = createHttpError(403, { message });
  }
}

export class NotFoundError {
  httpError: createHttpError.HttpError<404>;

  constructor(message: string) {
    this.httpError = createHttpError(404, { message });
  }
}

export class InternalServerError {
  httpError: createHttpError.HttpError<500>;

  constructor() {
    this.httpError = createHttpError(500);
  }
}
