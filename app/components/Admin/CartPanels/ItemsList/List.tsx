import type { SubmitFunction } from "@remix-run/react";
import type { FC } from "react";
import React from "react";
import { Button } from "~/components/Button/Button";
import EditQuantityForm from "../EditQuantityForm/EditQuantityForm";
import { handleDelete } from "./Handle";
import type { ItemsListProps, Quantities } from "./ItemsList";
import styles from "./styles.module.css";

type List = {
  toggleEdit: boolean;
  customerId: number;
  quantities: Quantities;
  handleChange: (
    itemId: number,
    e: React.ChangeEvent<HTMLInputElement>,
    setQuantities: React.Dispatch<React.SetStateAction<Quantities>>
  ) => void;
  submit: SubmitFunction;
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>;
};

const List: FC<ItemsListProps & List> = ({
  cart,
  toggleEdit,
  customerId,
  quantities,
  handleChange,
  submit,
  setQuantities,
}) => {
  return (
    <ul className={styles.list}>
      {cart?.cartItems.map((item) => (
        <li className={styles.card} key={item.id}>
          <img
            className={styles.thumbnail}
            src={item.product.thumbnail}
            alt={item.product.title}
          />
          <div>
            <p className={styles.title}>Product: {item.product.title}</p>
            {toggleEdit ? (
              <>
                <EditQuantityForm
                  customerId={customerId}
                  item={item}
                  quantities={quantities}
                  handleChange={handleChange}
                  setQuantities={setQuantities}
                />
                <p className={styles.stock}>Stock:{item.product.stock}</p>
              </>
            ) : (
              <span className={styles.quantityW}>
                <p className={styles.quantity}>Quantity :{item.quantity}</p>
                <p className={styles.stock}>Stock:{item.product.stock}</p>
              </span>
            )}
            <Button
              className={styles.delete}
              onClick={() =>
                handleDelete(item.product.title, item.id, customerId, submit)
              }
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
