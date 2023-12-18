import { Link } from "@remix-run/react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import CreateProductForm from "./CreateProduct/CreateProductForm";
import styles from "./styles.module.css";

const breadcrumbs = [
  { label: "Products", link: "/admin/products" },
  { label: "Product", link: "/admin/products" },
  { label: "Create product", link: "/admin/products" },
];

const CreateProduct = () => {
  return (
    <>
      <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />

      <div className={styles.nav}>
        Create form
        <Link className={styles.link} to={"/admin/products"}>
          Close create form
        </Link>
      </div>
      <div className={styles.panel}>
        <div className={styles.wrapper}>
          <CreateProductForm />
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
