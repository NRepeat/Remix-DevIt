import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { customerAuthenticator } from "~/services/auth.server";
import { existCustomer } from "~/services/customer.server";
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await customerAuthenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const isMember = await existCustomer(user.email);
  if (!isMember) {
    return redirect("/login");
  }
  return null;
}
function Home() {
  return <Outlet />;
}

export default Home;
