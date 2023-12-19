import { useState, type FC } from "react";
import { Button } from "~/components/Ui/Button/Button";
import type { CartItemsListProps } from "./CartItemsList";
import FormCard from "./Form";
import styles from "./styles.module.css";

const List: FC<CartItemsListProps> = ({ cart }) => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const startEditing = (itemId: number) => {
    setEditingItemId(itemId);
  };
  const stopEditing = () => {
    setEditingItemId(null);
  };

  return (
    <>
      {" "}
      {cart.cartItems.map((item) => (
        <div className={styles.card} key={item.id}>
          {editingItemId === item.id && (
            <Button className={styles.delete}>x</Button>
          )}
          <div className={styles.imgWrapper}>
            <img
              className={styles.img}
              src={item.product?.thumbnail}
              alt={item.product?.title}
            />
          </div>
          <div>
            <div className={styles.info}>
              <p className={styles.title}>{item.product?.title}</p>
              <p>{item.product.description}</p>
              <div className={styles.priceWrapper}>
                <p>{item.product.price} $</p>
                <p>
                  {item.quantity}/{item.product.stock}
                </p>
                <p>{item.product.rating}/5</p>
              </div>
            </div>
            {editingItemId === item.id ? (
              <FormCard item={item} />
            ) : (
              <div className={styles.action}>
                <Button onClick={() => startEditing(item.id)}>Edit</Button>
              </div>
            )}
          </div>
          {editingItemId === item.id && (
            <Button className={styles.close} onClick={stopEditing}>
              Close edit
            </Button>
          )}
        </div>
      ))}
    </>
  );
};

export default List;
