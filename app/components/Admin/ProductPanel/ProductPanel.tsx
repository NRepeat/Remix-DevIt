import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import CreateProduct from "./CreateProduct/CreateProduct";
import styles from "./styles.module.css";

const breadcrumbs = [{ label: "Create product", link: "/admin/customers" }];

const ProductPanel = () => {
  return (
    <>
      <div className={styles.nav}>
        <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />
      </div>
      <div className={styles.panel}>
        <CreateProduct />
      </div>
    </>
  );
};

export default ProductPanel;
