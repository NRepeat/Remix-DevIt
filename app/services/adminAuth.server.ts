import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { adminLoginSchema } from "~/components/Admin/Auth/Login/Login";
import { findMember, type Member } from "./member.server";
import { sessionStorage } from "./session.server";

export const memberAuthenticator = new Authenticator<Member | null>(
  sessionStorage
);

memberAuthenticator.use(
  new FormStrategy(async ({ form, context }) => {
    if (!form) {
      throw new Error("Admin login action error");
    }
    const validFromData = await adminLoginSchema.validate(form);

    if (validFromData.error) {
      throw new AuthorizationError("Email or password are incorrect");
    }

    let user = await findMember(validFromData.data);

    if (user === null) {
      throw new AuthorizationError("Email or password are incorrect");
    }
    return user;
  }),
  "member-auth"
);
