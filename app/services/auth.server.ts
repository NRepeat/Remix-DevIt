import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { loginSchema, registrationSchema } from "~/utils/formValidation";
import {
  createCustomer,
  login,
  type CustomerWithoutPassword,
} from "./customer.server";
import type { Member } from "./member.server";
import { loginMember } from "./member.server";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<
  CustomerWithoutPassword | Member
>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const validatedCustomerData = await loginSchema.validate(form);

    const user = await login(validatedCustomerData);

    if (user === null) {
      throw new AuthorizationError("Email or password are incorrect");
    }
    return user;
  }),
  "user-pass"
);
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const validatedCustomerData = await registrationSchema.validate(form);

    let user = await createCustomer(validatedCustomerData);
    return user;
  }),
  "user-reg"
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const validatedCustomerData = await loginSchema.validate(form);

    const user = await loginMember(validatedCustomerData);

    if (user === null) {
      throw new AuthorizationError("Email or password are incorrect");
    }
    return user;
  }),
  "member-pass"
);
