import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import { useControlField, useField } from "remix-validated-form";

type MySelectProps = {
  name: string;
  label: string;
  optionData?: Category[];
};

const ControlledSelect: FC<SerializeFrom<MySelectProps>> = ({
  label,
  name,
  optionData,
}) => {
  const { error, getInputProps } = useField(name);
  const [value, setValue] = useControlField<string[]>(name);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setValue(selectedOptions);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select {...getInputProps({ onChange: handleChange, value })}>
        {optionData?.map((category, i) => (
          <option key={i} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  );
};

export default ControlledSelect;
