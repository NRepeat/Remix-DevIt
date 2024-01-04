import type { HttpError } from "http-errors";
import createHttpError from "http-errors";
export function BadRequests(message?: string): HttpError {
  return createHttpError(400, { message });
}

export function UnauthorizedError(message?: string): HttpError {
  return createHttpError(401, { message });
}

export function SessionError(message?: string): HttpError {
  return createHttpError(401, { message });
}

export function ForbiddenError(message?: string): HttpError {
  return createHttpError(403, { message });
}

export function NotFoundError(message?: string): HttpError {
  return createHttpError(404, { message });
}

export function InternalServerError(): HttpError {
  return createHttpError(500);
}
