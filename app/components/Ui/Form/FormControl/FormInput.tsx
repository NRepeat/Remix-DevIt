import { useField } from "remix-validated-form";
import { Input } from "~/components/Input/Input";

type MyInputProps = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute | undefined;
};

export const FormInput = ({ name, label, type }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Input {...getInputProps({ type: type, id: name })} />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
