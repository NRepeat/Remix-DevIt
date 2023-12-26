import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";
import styles from "./styles.module.css";
type MyInputProps = {
  name: string;
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  value?: string;
};

export const FormTextInput = ({
  name,
  label,
  type,
  placeholder,
  value,
}: MyInputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={styles.text}>
      <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <textarea {...getInputProps({ value, id: name, placeholder })} />
      </div>

      {error && (
        <p
          className={styles.error}
          style={{ paddingBottom: "5px", paddingTop: "5px" }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
