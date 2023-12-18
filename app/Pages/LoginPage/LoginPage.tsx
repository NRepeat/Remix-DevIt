import { type FC } from "react";
import LoginForm from "~/components/Auth/LoginForm/LoginForm";
import styles from "./styles.module.css";

type LoginPageProps = {
  error?: string;
};

const LoginPage: FC<LoginPageProps> = ({ error }) => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.error}>{error}</div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
