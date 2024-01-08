import type { HttpError } from "http-errors";
import createHttpError from "http-errors";

export function createBadRequest(message?: string): HttpError {
  return createHttpError(400, { message });
}

export function createUnauthorizedError(message?: string): HttpError {
  return createHttpError(401, { message });
}

export function createSessionError(message?: string): HttpError {
  return createHttpError(401, { message });
}

export function createForbiddenError(message?: string): HttpError {
  return createHttpError(403, { message });
}

export function createNotFoundError(message?: string): HttpError {
  return createHttpError(404, { message });
}

export function createInternalServerError(): HttpError {
  return createHttpError(500);
}
