import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { adminLoginSchema } from "~/components/Admin/Auth/Login/Login";
import { adminSessionStorage } from "./adminSession.server";
import {
  AuthenticationError,
  CustomAuthorizationError,
  FormFieldsError,
  FormValidationError,
} from "./error.server";
import { findMember, loginMember, type Member } from "./member.server";

export const memberAuthenticator = new Authenticator<Member | null>(
  adminSessionStorage
);

memberAuthenticator.use(
  new FormStrategy(async ({ form, context }) => {
    try {
      const validFormData = await adminLoginSchema.validate(form);

      if (validFormData.error && validFormData.error.fieldErrors) {
        const fieldsKey = Object.keys(validFormData.error.fieldErrors);
        const fieldErrors = validFormData.error.fieldErrors;
        throw new FormFieldsError("Login", fieldsKey, fieldErrors);
      }
      if (!validFormData.data) {
        throw new FormValidationError("Login");
      }
      const isMember = await findMember({
        email: validFormData.data.email,
      });
      if (isMember) {
        try {
          const member = await loginMember(validFormData.data);
          return member;
        } catch (error) {
          throw new AuthenticationError("Email or password are incorrect");
        }
      }
    } catch (error) {
      if (
        error instanceof FormValidationError ||
        error instanceof AuthenticationError
      ) {
        throw new CustomAuthorizationError(error.message, error.name);
      }
    }
    throw new CustomAuthorizationError("Email or password are incorrect");
  }),
  "member-auth"
);
