import type { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import type { FC } from "react";
import type { CRUDPanelProps } from "../../CRUD/CRUDPanel";
import ButtonContainer from "./ButtonContainer/ButtonContainer";
import styles from "./styles.module.css";

const CustomerList: FC<SerializeFrom<CRUDPanelProps>> = ({ data }) => {
  const submit = useSubmit();
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <td className={styles.checkbox}>
            <input type="checkbox" name="id" id="selectAll" />
          </td>
          <td>Name</td>
          <td>Created at</td>
          <td>Cart</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {data.customers.customers.map((customer) => (
          <tr key={customer.id} className={styles.info}>
            <td>
              <input type="checkbox" name="id" id={`checkbox-${customer.id}`} />
            </td>
            <td>
              <p className={styles.bold}>
                {customer.name} {customer.secondName}
              </p>
              {customer.email}
            </td>
            <td>{new Date(customer.createdAt).toLocaleDateString("en-GB")}</td>
            {customer.cart?.id ? (
              <td className={styles.cartLink}>
                {" "}
                <Link to={`/admin/customers/customer/${customer.id}/cart`}>
                  {" "}
                  <p>View cart</p>{" "}
                </Link>{" "}
              </td>
            ) : (
              <td className={styles.cartLink}>
                {" "}
                <button
                  onClick={() =>
                    submit(
                      {},
                      {
                        action: `/admin/customers/customer/${customer.id}/cart/create`,
                        method: "post",
                      }
                    )
                  }
                >
                  {" "}
                  <p> Create cart</p>
                </button>{" "}
              </td>
            )}
            <td>
              <ButtonContainer customer={customer} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
