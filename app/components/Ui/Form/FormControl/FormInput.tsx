import { useField } from "remix-validated-form";
import { Input } from "~/components/Input/Input";

type MyInputProps = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
};

export const FormInput = ({ name, label, type, placeholder }: MyInputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Input {...getInputProps({ type, id: name, placeholder, min: 0 })} />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
