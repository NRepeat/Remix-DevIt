import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

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
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea {...getInputProps({ value, id: name, placeholder })} />
      {error && (
        <span style={{ paddingBottom: "5px", paddingTop: "5px" }}>{error}</span>
      )}
    </div>
  );
};
