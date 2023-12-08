import { Link } from "@remix-run/react";
import type { FC } from "react";
import Modal from "~/components/Modal/Modal";
import CreateForm from "./CreateForm";
import styles from "./styles.module.css";
const CreateCustomerPanel: FC = () => {


  return (

    <Modal>
      <div className={styles.addPanel}>
        <div className={styles.head}>
          <h2>Create customer  </h2>
          <Link className={styles.link} to={"/admin/crud/customers/"}>
            x
          </Link>
        </div>
        <CreateForm />

      </div>
    </Modal>
  );
};

export default CreateCustomerPanel;
