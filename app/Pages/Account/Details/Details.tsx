import type { Customer } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { type FC } from "react";
import PersonalInformationForm from "./PersonalInformationForm/PersonalInformationForm";
import styles from "./styles.module.css";

export type DetailsProps = {
  customer: SerializeFrom<Customer>;
};

const Details: FC<DetailsProps> = ({ customer }) => {
  const defaultCustomerValues = {
    name: customer.name,
    lastName: customer.secondName,
    email: customer.email,
    id: customer.id,
  };

  return (
    <main className={styles.container}>
      <PersonalInformationForm defaultCustomerValues={defaultCustomerValues} />
      {/* <NestedList customer={customer} /> */}
    </main>
  );
};

export default Details;
