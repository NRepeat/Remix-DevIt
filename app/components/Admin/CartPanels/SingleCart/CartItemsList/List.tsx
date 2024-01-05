import type { SerializeFrom } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { type FC } from "react";
import { Input } from "~/components/Ui/Input/Input";
import type { CartWithCartItems } from "../SingleCart";
import ButtonContainer from "./ButtonContainer/ButtonContainer";
import styles from "./styles.module.css";
export type CartItemsListProps = {
  cart: SerializeFrom<CartWithCartItems>;
};
const List: FC<CartItemsListProps> = ({ cart }) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/admin/products/product/${id}/edit`);
  };
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
          <td className={styles.rating}>Rating</td>
          <td className={styles.stock}>In cart</td>
          <td className={styles.created}>Created at</td>
          <td className={styles.action}>Action</td>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {cart.cartItems.map((item) => (
          <tr
            onClick={() => handleClick(item.productId)}
            key={item.id}
            className={styles.info}
          >
            <td className={styles.checkboxB}>
              <Input type="checkbox" name={`checkbox-${item.id}`} />
            </td>
            <td className={styles.imgWrapper}>
              <img
                alt={item.product.title}
                src={item.product.thumbnail}
                className={styles.img}
              />
            </td>
            <td className={styles.name}>
              <p className={styles.title}>{item.product.title}</p>
            </td>
            <td className={styles.description}> {item.product.description}</td>
            <td className={styles.rating}> {item.product.rating}</td>
            <td className={styles.stock}> {item.quantity}</td>
            <td className={styles.created}>
              {new Date(item.createdAt).toLocaleDateString("en-GB")}
            </td>
            <td className={styles.action}>
              <ButtonContainer product={item.product} itemId={item.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
