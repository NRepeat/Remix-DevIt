import type { ErrorResponse } from "@remix-run/node";
import { type FC } from "react";
import LoginForm from "~/components/Auth/LoginForm/LoginForm";
import styles from "./styles.module.css";

type LoginProps = {
  error?: ErrorResponse;
};

const LoginPage: FC<LoginProps> = ({ error }) => {
  return (
    <div className={styles.loginPage}>
      {error && <p className={styles.error}>{error?.data.slice(6)}</p>}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
