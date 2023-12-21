import { Link } from "@remix-run/react";
import { type FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import { loginSchema } from "~/utils/formValidation";
import styles from "./styles.module.css";

const LoginForm: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login in </h2>
      <ValidatedForm
        method="post"
        validator={loginSchema}
        className={styles.form}
      >
        <FormInput
          type="email"
          placeholder="Email"
          name="email"
          label="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          name="password"
          label="password"
        />

        <Link to={"/"} className={styles.forgot}>
          Forgot password?
        </Link>
        <div className={styles.buttonContainer}>
          <SubmitButton>Sign in</SubmitButton>
          <div className={styles.bgButton}></div>
        </div>
      </ValidatedForm>
      <div className={styles.reg}>
        New in Store? <Link to={"/registration"}>Register</Link>{" "}
      </div>
      <Link className={styles.back} to={"/"}>
        {" "}
        Back to main page
      </Link>
    </div>
  );
};

export default LoginForm;
