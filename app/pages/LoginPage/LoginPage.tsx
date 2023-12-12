import { type FC } from "react";
import type { ValidationErrorResponseData } from "remix-validated-form";
import LoginForm from "~/components/Auth/LoginForm/LoginForm";
import styles from "./styles.module.css";
export type LoginPageProps = {
  actionData:
    | ValidationErrorResponseData
    | {
        error: string;
      }
    | undefined;
};

const LoginPage: FC<LoginPageProps> = ({ actionData }) => {
  return (
    <div className={styles.loginPage}>
      <LoginForm actionData={actionData} />
    </div>
  );
};

export default LoginPage;
