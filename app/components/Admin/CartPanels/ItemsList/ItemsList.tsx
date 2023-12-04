import { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import React, { FC, useState } from "react";
import { loader } from "~/routes/admin.customers_.customer.$id.cart";
import EditQuantityForm from "../EditQuantityForm/EditQuantityForm";
import styles from "./styles.module.css";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import AddProducts from "../AddProducts/AddProducts";

export interface ItemsListProps extends SerializeFrom<typeof loader> {}
export type Quantities = {
  [key: string]: string;
};

const ItemsList: FC<ItemsListProps> = ({
  cart,
  customerId,
  products,
}) => {
  const submit = useSubmit();
  const [quantities, setQuantities] = useState<Quantities>({});
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleChange = (
    itemId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  const handleDelete = (title: string, id: number, customerId: number) => {
    const confirmDelete = confirm(
      `Are you sure  ,you want to delete ${title} in cart ? `
    );

    confirmDelete
      ? submit(
          { id },
          {
            action: `/admin/customers/customer/${customerId}/cart/action/delete`,
            method: "post",
          }
        )
      : null;
  };
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    {
      label: `Customer ${customerId} `,
      link: `/admin/customers/customer/${customerId}/edit`,
    },
    { label: `Cart `, link: `/admin/customers/customer/${customerId}/cart` },
  ];
  return (
    <div className={styles.cart}>
      <div className={styles.head}>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={true} />
        <Link to={"/admin/customers/"}>Close</Link>
      </div>

      {cart.cartItems.length > 1 ? (
        <>
          <ul className={styles.list}>
            <button onClick={() => setToggleEdit((prevToggle) => !prevToggle)}>
              {toggleEdit ? "Close  edit fields" : "Open edit fields"}
            </button>
            {cart?.cartItems.map((item) => (
              <li key={item.id}>
                <p>Product: {item.product.title}</p>
                {toggleEdit ? (
                  <EditQuantityForm
                    customerId={customerId}
                    item={item}
                    quantities={quantities}
                    handleChange={handleChange}
                  />
                ) : (
                  <span className={styles.quantityW}>
                    <p>Quantity</p>:{item.quantity}
                  </span>
                )}
                <button
                  onClick={() =>
                    handleDelete(item.product.title, item.id, customerId)
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <AddProducts data={products} />
      )}
    </div>
  );
};

export default ItemsList;
