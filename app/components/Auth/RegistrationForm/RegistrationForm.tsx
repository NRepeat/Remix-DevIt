import { Link } from "@remix-run/react";
import type { FC } from "react";
import CreateCustomerForm from "~/components/Forms/CreateCustomerForm/CreateCustomerForm";
import type { RegistrationPageProps } from "~/pages/RegistrationPage/RegistrationPage";
import styles from "./styles.module.css";

const RegistrationForm: FC<RegistrationPageProps> = ({ actionData }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create account</h2>

      <CreateCustomerForm actionData={actionData} />
      <div className={styles.reg}>
        Already registered? <Link to={"/login"}>Sign in</Link>{" "}
      </div>
      <Link to={"/"}> Back to main page</Link>
    </div>
  );
};

export default RegistrationForm;
