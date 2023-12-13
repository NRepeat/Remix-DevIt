import CreateProduct from "./CreateProduct/CreateProduct";
import styles from "./styles.module.css";
const ProductPanel = () => {
  return (
    <div className={styles.panel}>
      <CreateProduct />
    </div>
  );
};

export default ProductPanel;
