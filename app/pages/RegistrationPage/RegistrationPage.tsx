import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ValidationErrorResponseData } from "remix-validated-form";
import RegistrationForm from "~/components/Auth/RegistrationForm/RegistrationForm";
import styles from "./styles.module.css";
export type RegistrationPageProps = {
  actionData:
    | ValidationErrorResponseData
    | {
        error: string;
      }
    | undefined;
};
const RegistrationPage: FC<SerializeFrom<RegistrationPageProps>> = ({
  actionData,
}) => {
  return (
    <div className={styles.registrationPage}>
      <RegistrationForm actionData={actionData} />
    </div>
  );
};

export default RegistrationPage;
