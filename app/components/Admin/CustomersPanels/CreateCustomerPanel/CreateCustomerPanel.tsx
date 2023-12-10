import { Link } from "@remix-run/react";
import type { FC } from "react";
import CreateForm from "./CreateForm";
import styles from "./styles.module.css";
const CreateCustomerPanel: FC = () => {
  return (
    <div className={styles.addPanel}>
      <div className={styles.head}>
        <h2>Create customer </h2>
        <Link className={styles.link} to={"/admin/customers/"}>
          x
        </Link>
      </div>
      <CreateForm />
    </div>
  );
};

export default CreateCustomerPanel;
