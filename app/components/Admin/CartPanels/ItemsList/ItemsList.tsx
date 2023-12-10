import type { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import type { FC } from "react";
import React, { useState } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import { Button } from "~/components/Button/Button";
import type { loader } from "~/routes/admin.customers_.customer.$id.cart";
import AddProducts from "../AddProductsPanel/AddProductsPanel";
import EditQuantityForm from "../EditQuantityForm/EditQuantityForm";
import styles from "./styles.module.css";

export interface ItemsListProps extends SerializeFrom<typeof loader> {}
export type Quantities = {
  [key: string]: number;
};

const ItemsList: FC<ItemsListProps> = ({ cart, customerId, products }) => {
  const submit = useSubmit();
  const [quantities, setQuantities] = useState<Quantities>({});
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);

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
    if (!confirmDelete) {
      return null;
    }
    submit(
      { cartItemId: id },
      {
        action: `/admin/customers/customer/${customerId}/cart/item/delete`,
        method: "post",
      }
    );
  };

  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    {
      label: `Customer ${cart.customer?.name} `,
      link: `/admin/customers`,
    },
    { label: `Cart `, link: `/admin/customers/customer/${customerId}/cart` },
  ];

  return (
    <div className={styles.cart}>
      <div className={styles.head}>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={true} />
        <Link to={"/admin/customers/"}>Close</Link>
      </div>
      {!toggleAdd ? (
        <>
          <Button
            onClick={() => setToggleEdit((prevToggle) => !prevToggle)}
            type="button"
          >
            {toggleEdit ? "Close edit fields" : "Open edit fields"}
          </Button>

          <Button onClick={() => setToggleAdd((prevToggle) => !prevToggle)}>
            {toggleAdd ? "Close add tab" : "Open add tab"}
          </Button>
          <ul className={styles.list}>
            {cart?.cartItems.map((item) => (
              <li className={styles.card} key={item.id}>
                <img
                  className={styles.thumbnail}
                  src={item.product.thumbnail}
                  alt={item.product.title}
                />
                <div>
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
                      <p>Quantity :{item.quantity}</p>
                      <p>Stock:{item.product.stock}</p>
                    </span>
                  )}
                  <Button
                    onClick={() =>
                      handleDelete(item.product.title, item.id, customerId)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <Button onClick={() => setToggleAdd((prevToggle) => !prevToggle)}>
            {toggleAdd ? "Close add tab" : "Open add tab"}
          </Button>
          <AddProducts data={products} cart={cart} customerId={customerId} />
        </>
      )}
    </div>
  );
};

export default ItemsList;
