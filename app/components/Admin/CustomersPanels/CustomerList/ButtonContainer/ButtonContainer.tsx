import type { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import clsx from "clsx";
import React from "react";
import { Button } from "~/components/Button/Button";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import { handleSubmit } from "./Handle";
import styles from "./styles.module.css";

export interface ButtonContainerProps {
  customer: CustomerWithoutPassword;
}

const ButtonContainer: React.FC<SerializeFrom<ButtonContainerProps>> = ({
  customer,
}) => {
  const submit = useSubmit();

  return (
    <div className={styles.buttonContainer}>
      <Link
        className={clsx(styles.button, styles.edit)}
        to={`customer/${customer.id}/edit`}
      >
        Edit
      </Link>

      <Button
        className={clsx(styles.button, styles.delete)}
        onClick={() => handleSubmit({ id: customer.id, submit })}
      >
        Delete
      </Button>
    </div>
  );
};

export default ButtonContainer;
