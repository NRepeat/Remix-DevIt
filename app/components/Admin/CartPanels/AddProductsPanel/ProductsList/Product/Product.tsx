import { useRouteLoaderData } from "@remix-run/react";
import type { FC } from "react";
import type { loader } from "~/routes/admin.customers_.customer.$id.cart";
import type { ProductProps } from "~/types/types";
import styles from "../styles.module.css";
import { AddToCartButton } from "./AddToCartButton";
import { ProductInformation } from "./ProductInformation";

const ProductRow: FC<ProductProps> = ({ product, cart }) => {
  const AdminCustomerRouteData = useRouteLoaderData<typeof loader>(
    "routes/admin.customers_.customer.$id.cart"
  );
  if (!AdminCustomerRouteData) {
    throw new Response("Customer not found");
  }
  const { customerId } = AdminCustomerRouteData;

  return (
    <li className={styles.product}>
      <ProductInformation product={product} />
      <div className={styles.inputContainer}>
        <AddToCartButton
          cart={cart}
          product={product}
          customerId={customerId}
        />
      </div>
    </li>
  );
};

export default ProductRow;
