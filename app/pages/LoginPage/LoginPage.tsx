import { Link } from "@remix-run/react";
import { type FC } from "react";
import { Button } from "~/components/Button/Button";
import FormM from "~/components/Form/FormM";
import { Input } from "~/components/Input/Input";
import styles from "./styles.module.css";

const LoginPage: FC = () => {
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign in </h2>
        <FormM
          method="post"
          action="/login"
          isFetcher={false}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <Input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <Link to={"/"} className={styles.forgot}>
            Forgot password?
          </Link>
          <Button className={styles.loginButton} type="submit">
            Sign in
          </Button>
        </FormM>
        <div className={styles.reg}>
          New in Store? <Link to={"/registration"}>Register</Link>{" "}
        </div>
        <Link to={"/"}> Back to main page</Link>
      </div>
    </section>
    // <Form method="post">
    //   <label htmlFor="email">email</label>
    //   <input required type="email" name="email" id="email" />
    //   <label htmlFor="password">password</label>
    //   <input required type="password" name="password" id="password" />
    //   <button type="submit">Submit</button>
    // </Form>
  );
};

export default LoginPage;
