import { Link, useRouteLoaderData } from "@remix-run/react";
import type { FC } from "react";
import type { loader } from "~/routes/admin.customers_.customer.$id.cart";
import type { ProductProps } from "~/types/types";
import styles from "../styles.module.css";
import { AddToCartButton } from "./AddToCartButton";
import { ProductInformation } from "./ProductInformation";
import { QuantityCounter } from "./QuantityInput";

const ProductRow: FC<ProductProps> = ({
  product,
  cart,
  quantities,
  setQuantities,
  submit,
  handleAddItemToCart,
  handleQuantityChange,
}) => {
  const AdminCustomerRouteData = useRouteLoaderData<typeof loader>(
    "routes/admin.customers_.customer.$id.cart"
  );
  if (!AdminCustomerRouteData) {
    throw new Response("Customer not found");
  }
  const { customerId } = AdminCustomerRouteData;

  return (
    <li className={styles.product}>
      <Link to={`/admin/customers/customer/${product.id}/cart/products/`}>
        <ProductInformation product={product} />
        <QuantityCounter
          handleQuantityChange={handleQuantityChange}
          productId={product.id}
          productStock={product.stock}
          quantities={quantities}
          setQuantities={setQuantities}
        />
        <AddToCartButton
          cart={cart}
          handleAddItemToCart={handleAddItemToCart}
          product={product}
          quantities={quantities}
          submit={submit}
          customerId={customerId}
        />
      </Link>
    </li>
  );
};

export default ProductRow;
