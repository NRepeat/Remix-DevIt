import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import { Input } from "~/components/Input/Input";
import type { ProductData } from "~/services/product.server";
import ButtonContainer from "./ButtonContainer/ButtonContainer";
import styles from "./styles.module.css";

const Table: FC<SerializeFrom<ProductData>> = ({ products }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <td className={styles.checkbox}>
            <Input type="checkbox" name="id" id="selectAll" />
          </td>
          <td className={styles.image}>Image</td>
          <td className={styles.name}>Title</td>
          <td className={styles.description}>Description</td>
          <td className={styles.category}>Category</td>
          <td className={styles.rating}>Rating</td>
          <td className={styles.stock}>Stock</td>
          <td className={styles.createdAt}>Created at</td>
          <td className={styles.action}>Action</td>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className={styles.info}>
            <td className={styles.checkboxB}>
              <Input type="checkbox" name={`checkbox-${product.id}`} />
            </td>
            <td className={styles.imgWrapper}>
              <img
                alt={product.title}
                src={product.thumbnail}
                className={styles.img}
              />
            </td>
            <td className={styles.name}>
              <p className={styles.title}>{product.title}</p>
            </td>
            <td className={styles.description}> {product.description}</td>

            <td> {product.category?.slug}</td>
            <td className={styles.rating}> {product.rating}</td>
            <td className={styles.stock}> {product.stock}</td>
            <td>{new Date(product.createdAt).toLocaleDateString("en-GB")}</td>

            <td>
              <ButtonContainer product={product} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
