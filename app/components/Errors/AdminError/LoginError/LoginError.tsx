import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Login from "~/components/Admin/Auth/Login/Login";

const LoginError = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Login error={error} />;
  }
};
export default LoginError;
