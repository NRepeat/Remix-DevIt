export type HandleArgs = {
  e: React.ChangeEvent<HTMLInputElement>;

  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      secondName: string;
      email: string;
      id: number;
    }>
  >;
};

export const handleChange = ({ e, setFormData }: HandleArgs) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
