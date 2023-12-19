import { type FC } from "react";
import LoginForm from "~/components/Auth/LoginForm/LoginForm";
import styles from "./styles.module.css";

type LoginProps = {
  error?: string;
};

const LoginPage: FC<LoginProps> = ({ error }) => {
  return (
    <div className={styles.loginPage}>
      {error && <p className={styles.error}>{error}</p>}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
