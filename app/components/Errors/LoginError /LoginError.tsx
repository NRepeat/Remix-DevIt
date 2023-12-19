import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import LoginPage from "~/Pages/LoginPage/LoginPage";

const LoginError = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <LoginPage error={error} />
      </>
    );
  }
};
export default LoginError;
