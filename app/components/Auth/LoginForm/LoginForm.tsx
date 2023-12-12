import { Link } from "@remix-run/react";
import { type FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Ui/Form/FormControl/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import type { LoginPageProps } from "~/pages/LoginPage/LoginPage";
import { loginSchema } from "~/utils/formValidation";
import styles from "./styles.module.css";

const LoginForm: FC<LoginPageProps> = ({ actionData }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign in </h2>
      <ValidatedForm
        method="post"
        validator={loginSchema}
        className={styles.form}
      >
        <FormInput name="email" label="email" />
        <FormInput name="password" label="password" />
        {actionData && "error" in actionData && (
          <span> {actionData.error}</span>
        )}
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
  );
};

export default LoginForm;
