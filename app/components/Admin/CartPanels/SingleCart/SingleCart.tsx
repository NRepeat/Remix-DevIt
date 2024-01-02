import type { Cart, CartItem, Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import List from "./CartItemsList/List";
import styles from "./styles.module.css";

export type CartWithCartItems = Cart & {
  cartItems: CartItem[] & { product: Product }[];
};
type SingleCartProps = {
  customer: CustomerWithoutPassword;
  cart: CartWithCartItems;
};

const SingleCart: FC<SerializeFrom<SingleCartProps>> = ({ customer, cart }) => {
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    { label: `${customer.name}`, link: "/admin/customers" },
    { label: `Cart`, link: `` },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.title}>
        Cart items
        <Link className={styles.link} to={"/admin/customers/"}>
          Close cart
        </Link>
      </div>
      <List cart={cart} />
    </>
  );
};

export default SingleCart;
