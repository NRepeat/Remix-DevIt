import type { FC } from "react";
import React from "react";
import styles from "./styles.module.css";
import { Product } from "@prisma/client";
import { useRouteLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/admin.customers_.customer.$id.cart";
import type {
  AddItemToCartButtonProps,
  CartProduct,
  ProductProps,
  QuantityInputProps,
} from "~/types/types";

const ProductRow: FC<ProductProps> = ({
  product,
  cart,
  quantities,
  setQuantities,
  submit,
  handleAddItemToCart,
  handleQuantityChange,
}) => {
  const routeData = useRouteLoaderData<typeof loader>(
    "routes/admin.customers_.customer.$id.cart"
  );
  const ProductInformation: FC<{ product: CartProduct }> = ({ product }) => {
    return (
      <>
        <p className={styles.id}>ID: {product.id}</p>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.stock}>Stock:{product.stock}</p>
      </>
    );
  };
  const AddToCartButton: FC<AddItemToCartButtonProps> = ({
    cart,
    product,
    quantities,
    submit,
    handleAddItemToCart,
  }) => {
    return (
      <button
        onClick={() =>
          handleAddItemToCart(
            cart.id,
            product.id,
            quantities[product.id],
            routeData?.customerId!,
            submit
          )
        }
      >
        Add to cart
      </button>
    );
  };
  const QuantityInput: FC<QuantityInputProps> = ({
    productId,
    quantities,
    handleQuantityChange,
  }) => {
    return (
      <input
        onChange={(e) => handleQuantityChange(setQuantities,productId, e)}
        type="number"
        placeholder="Quantity"
        value={quantities[productId] || 0}
      />
    );
  };
  return (
    <li className={styles.product}>
      <ProductInformation product={product} />
      <QuantityInput
        handleQuantityChange={handleQuantityChange}
        productId={product.id}
        quantities={quantities}
      />
      <AddToCartButton
        cart={cart}
        handleAddItemToCart={handleAddItemToCart}
        product={product}
        quantities={quantities}
        submit={submit}
      />
    </li>
  );
};

export default ProductRow;
