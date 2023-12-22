import type { FieldErrors } from "remix-validated-form";

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class FormValidationError extends CustomError {
  formName: string;
  fieldErrors?: FieldErrors;

  constructor(formName: string, fieldErrors?: FieldErrors) {
    super(`Data is incorrect in form: ${formName}`);
    this.formName = formName;
    this.fieldErrors = fieldErrors;
  }
}

export class FormFieldsError extends FormValidationError {
  constructor(
    formName: string,
    fieldNames?: string[],
    errorMessage?: FieldErrors
  ) {
    const fields: FieldErrors = {};
    if (fieldNames && errorMessage) {
      fieldNames.forEach((field) => {
        fields[field] = errorMessage[field] ? errorMessage[field] : "Error";
      });
    }

    super(formName, fields);
  }
}
export class CustomAuthorizationError extends CustomError {
  cause?: string;
  fieldErrors?: FieldErrors;
  constructor(message: string, cause?: string, fieldErrors?: FieldErrors) {
    super(`Access is denied ${cause}`);
    this.name = "CustomAuthorizationError";
    this.cause = cause;
    this.message = message;
    this.fieldErrors = fieldErrors;
  }
}
