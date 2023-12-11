import { Link } from "@remix-run/react";
import type { FC } from "react";
import { Button } from "~/components/Button/Button";
import FormM from "~/components/Form/FormM";
import { Input } from "~/components/Input/Input";
import styles from "./styles.module.css";
const RegistrationPage: FC = () => {
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <h2 className={styles.title}>Create account</h2>
        <FormM isFetcher={false} className={styles.form}>
          <div className={styles.field}>
            <p>Full Name </p>
            <Input placeholder="Name" />
            <Input placeholder="Last Name" />
          </div>
          <div className={styles.field}>
            <p>Email </p>
            <Input placeholder="Email " />
          </div>
          <div className={styles.field}>
            <p>Password</p>
            <Input placeholder="Password" />
          </div>
          <Link to={"/"} className={styles.forgot}>
            Forgot password?
          </Link>
          <Button className={styles.loginButton} type="submit">
            Sign up
          </Button>
        </FormM>
        <div className={styles.reg}>
          Already registered? <Link to={"/login"}>Sign in</Link>{" "}
        </div>
        <Link to={"/"}> Back to main page</Link>
      </div>
    </section>
  );
};

export default RegistrationPage;
