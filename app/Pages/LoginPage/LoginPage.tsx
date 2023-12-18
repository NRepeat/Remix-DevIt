import { type FC } from "react";
import LoginForm from "~/components/Auth/LoginForm/LoginForm";
import styles from "./styles.module.css";

const LoginPage: FC = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
