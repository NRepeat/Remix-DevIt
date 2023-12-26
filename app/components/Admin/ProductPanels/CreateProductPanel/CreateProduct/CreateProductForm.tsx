import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import { CreateProductDataSchema } from "~/utils/productValidation";
import styles from "./styles.module.css";
const CreateProductForm: FC = () => {
  const defaultValues = {
    stock: 0,
    discountPercentage: 0,
    rating: 0,
    price: 0,
  };

  return (
    <div className={styles.container}>
      <ValidatedForm
        className={styles.form}
        defaultValues={defaultValues}
        validator={CreateProductDataSchema}
        method="post"
      >
        <FormInput label="Product Name" name="title" />
        <FormInput label="Product Brand" name="brand" />
        <FormInput type="number" label="Stock" name="stock" />
        <FormInput type="number" label="Discount %" name="discountPercentage" />
        <FormInput type="number" label="Rating" name="rating" />
        <FormInput label="Product Category" name="category" />
        <FormInput label="Product Description" name="description" />
        <FormInput
          placeholder="https://example.com"
          type="url"
          label="Image preview"
          name="thumbnail"
        />
        <FormInput
          placeholder="https://example.com"
          type="url"
          label="Additional images "
          name="images"
        />
        <FormInput type="number" label="Price" name="price" />
        <SubmitButton>Create</SubmitButton>
      </ValidatedForm>
      <div className={styles.upload}>
        Your image
        <button>Upload</button>
      </div>
    </div>
  );
};

export default CreateProductForm;
