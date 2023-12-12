import { Link } from "@remix-run/react";
import type { FC } from "react";
import CreateCustomerForm from "~/components/Forms/CreateCustomerForm/CreateCustomerForm";
import type { RegistrationPageProps } from "~/pages/RegistrationPage/RegistrationPage";
import styles from "./styles.module.css";
const CreateCustomerPanel: FC<RegistrationPageProps> = ({ actionData }) => {
  return (
    <div className={styles.addPanel}>
      <div className={styles.head}>
        <h2>Create customer </h2>
        <Link className={styles.link} to={"/admin/customers/"}>
          x
        </Link>
      </div>
      <div className={styles.container}>
        <CreateCustomerForm actionData={actionData} />
      </div>
    </div>
  );
};

export default CreateCustomerPanel;
