import type { FC } from "react";
import RegistrationForm from "~/components/Auth/RegistrationForm/RegistrationForm";
import styles from "./styles.module.css";

const RegistrationPage: FC = () => {
  return (
    <div className={styles.registrationPage}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
