import type { ErrorResponse } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import styles from "./styles.module.css";
export const adminLoginSchema = withZod(
  z.object({
    email: z.string(),
    password: z.string().min(8),
  })
);
type LoginProps = {
  error?: ErrorResponse;
};
const Login: FC<LoginProps> = ({ error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.error}>{error?.data.slice(6)}</p>
        <ValidatedForm validator={adminLoginSchema} method="post">
          <h2 className={styles.title}>Login in administrator panel</h2>

          <FormInput
            type="email"
            placeholder="Email"
            name="email"
            label="Email"
          />
          <FormInput
            type="password"
            placeholder="Password"
            name="password"
            label="Password"
          />
          <Link className={styles.forgot} to={"admin/login"}>
            Forgot password?
          </Link>
          <SubmitButton>Sign in</SubmitButton>
        </ValidatedForm>
        <p>
          Don't have login?{" "}
          <Link className={styles.register} to={"/admin/register"}>
            Register{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
