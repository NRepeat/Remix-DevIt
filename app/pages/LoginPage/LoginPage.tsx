import { Link } from "@remix-run/react";
import { type FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Ui/Form/FormControl/FormControl";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import { login } from "~/utils/formValidation";
import styles from "./styles.module.css";

const LoginPage: FC = () => {
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign in </h2>
        <ValidatedForm method="post" validator={login} className={styles.form}>
          <FormInput name="email" label="email" />
          <FormInput name="password" label="password" />
          <Link to={"/"} className={styles.forgot}>
            Forgot password?
          </Link>
          <SubmitButton />
        </ValidatedForm>
        <div className={styles.reg}>
          New in Store? <Link to={"/registration"}>Register</Link>{" "}
        </div>
        <Link to={"/"}> Back to main page</Link>
      </div>
    </section>
  );
};

export default LoginPage;
