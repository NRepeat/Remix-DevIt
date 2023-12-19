import type { ActionFunctionArgs } from "@remix-run/node";
import { customerAuthenticator } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  await customerAuthenticator.logout(request, { redirectTo: "/login" });
}
