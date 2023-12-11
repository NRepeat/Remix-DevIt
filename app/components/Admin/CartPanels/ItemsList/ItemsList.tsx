import type { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import { Button } from "~/components/Button/Button";
import type { loader } from "~/routes/admin.customers_.customer.$id.cart";
import AddProducts from "../AddProductsPanel/AddProductsPanel";
import { handleChange } from "./Handle";
import List from "./List";
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

  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    {
      label: `Customer ${cart.customer?.name} `,
      link: `/admin/customers`,
    },
    { label: `Cart `, link: `/admin/customers/customer/${customerId}/cart` },
  ];

  return (
    <>
      <div className={styles.head}>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={true} />
        <Link to={"/admin/customers/"}>X</Link>
      </div>
      <div className={styles.cart}>
        {!toggleAdd ? (
          <>
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => setToggleEdit((prevToggle) => !prevToggle)}
                type="button"
              >
                {toggleEdit ? "Close edit fields" : "Open edit fields"}
              </Button>

              <Button onClick={() => setToggleAdd((prevToggle) => !prevToggle)}>
                {toggleAdd ? "Close add tab" : "Open add tab"}
              </Button>
            </div>

            <List
              cart={cart}
              customerId={customerId}
              handleChange={handleChange}
              products={products}
              quantities={quantities}
              setQuantities={setQuantities}
              submit={submit}
              toggleEdit={toggleEdit}
            />
          </>
        ) : (
          <>
            <Button
              className={styles.addButton}
              onClick={() => setToggleAdd((prevToggle) => !prevToggle)}
            >
              {toggleAdd ? "Close add tab" : "Open add tab"}
            </Button>
            <AddProducts data={products} cart={cart} customerId={customerId} />
          </>
        )}
      </div>
    </>
  );
};

export default ItemsList;
