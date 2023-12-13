import { useField } from "remix-validated-form";
import { Input } from "~/components/Input/Input";

type MyInputProps = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  value?: number | string;
};

export const FormInput = ({
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
      <Input
        {...getInputProps({ value, type, id: name, placeholder, min: 0 })}
      />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
