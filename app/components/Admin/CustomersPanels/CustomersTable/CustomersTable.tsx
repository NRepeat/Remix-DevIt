import type { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import type { FC } from "react";
import { Input } from "~/components/Ui/Input/Input";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import ButtonContainer from "./ButtonContainer/ButtonContainer";
import { handleCartCreate } from "./ButtonContainer/Handle";
import styles from "./styles.module.css";

type CustomersTableProps = {
  customers: CustomerWithoutPassword[];
};

const CustomersTable: FC<SerializeFrom<CustomersTableProps>> = ({
  customers,
}) => {
  const submit = useSubmit();

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <td className={styles.checkbox}>
            <Input type="checkbox" name="id" id="selectAll" />
          </td>
          <td className={styles.name}>Name</td>
          <td className={styles.email}>Email</td>
          <td className={styles.created}>Created at</td>
          <td className={styles.cart}>Cart</td>
          <td className={styles.action}>Action</td>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} className={styles.info}>
            <td className={styles.checkboxB}>
              <Input type="checkbox" name={`checkbox-${customer.id}`} />
            </td>
            <td>
              <p className={styles.bold}>
                {customer.name} {customer.secondName}
              </p>
            </td>
            <td> {customer.email}</td>
            <td>{new Date(customer.createdAt).toLocaleDateString("en-GB")}</td>
            {customer.cart?.id ? (
              <td className={styles.cartLink}>
                <Link to={`/admin/customers/customer/${customer.id}/cart`}>
                  View cart
                </Link>
              </td>
            ) : (
              <td className={styles.cartLink}>
                <button
                  onClick={() => handleCartCreate({ id: customer.id, submit })}
                >
                  <p className={styles.create}> Create cart</p>
                </button>
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

export default CustomersTable;
