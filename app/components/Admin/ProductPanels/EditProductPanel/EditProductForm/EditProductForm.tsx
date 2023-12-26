import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { Button } from "~/components/Ui/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { FormTextInput } from "~/components/Ui/Form/FormControl/ControlledTextArea/ControlledTextArea";
import styles from "./styles.module.css";

type FormProps = {
  formData: {
    thumbnail: string;
    title: string;
    description: string;
    category: Category;
    rating: number;
    stock: number;
  };

  classNames?: string;
};

export const editProductSchema = withZod(
  z.object({
    thumbnail: z.string(),
    title: z.string(),
    description: z.coerce.string(),
    category: z.string(),
    rating: z.coerce.number(),
    stock: z.coerce.number(),
  })
);

const EditProductForm: FC<SerializeFrom<FormProps>> = ({ formData }) => {
  return (
    <div className={styles.container}>
      <ValidatedForm
        method="post"
        validator={editProductSchema}
        defaultValues={{
          thumbnail: formData.thumbnail,
          title: formData.title,
          description: formData.description,
          category: formData.category.name,
          rating: formData.rating,
          stock: formData.stock,
        }}
        className={styles.form}
      >
        <FormInput type="url" label="Image" name="thumbnail" />
        <FormInput label="Title" name="title" />

        <FormTextInput label="Description" name="description" />

        <FormInput label="Category" name="category" />
        <FormInput label="Rating" name="rating" />
        <FormInput label="Stock" name="stock" />
        <Button type="submit">Save</Button>
      </ValidatedForm>
      <img
        className={styles.prevue}
        src={formData.thumbnail}
        alt={formData.title}
      />
    </div>
  );
};
export default EditProductForm;
