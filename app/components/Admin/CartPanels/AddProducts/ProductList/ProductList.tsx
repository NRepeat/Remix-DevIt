import { SerializeFrom } from "@remix-run/node";
import { FC, useState } from "react";
import styles from "./styles.module.css";
import { AddProductProps } from "../AddProducts";
import { Quantities } from "../../ItemsList/ItemsList";
import {
  useRouteLoaderData,
  useSubmit,
} from "@remix-run/react";
import { loader } from "~/routes/admin.customers_.customer.$id.cart";
import Pagination from "~/components/Pagination/Pagination";

const ProductList: FC<SerializeFrom<AddProductProps>> = ({ data, cart }) => {
  console.log("🚀 ~ file: ProductList.tsx:14 ~ cart:", cart)
  const routeData = useRouteLoaderData<typeof loader>(
    "routes/admin.customers_.customer.$id.cart"
  );
  const [quantities, setQuantities] = useState<Quantities>({});
  const submit = useSubmit();
  const handleAddToCart = async (
    cartId: number,
    productId: number,
    quantity: number,
    customerId: number
  ) => {
    submit(
      { cartId, productId, quantity },
      {
        action: `/admin/customers/customer/${customerId}/cart/addItem`,
        method: "post",
      }
    );
  };
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
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.products.map((product) => (
          <li key={product.id} className={styles.product}>
            <p className={styles.id}>ID: {product.id}</p>
            <p className={styles.title}>{product.title}</p>
            <p className={styles.stock}>Stock:{product.stock}</p>
            <input
              onChange={(e) => handleChange(product.id, e)}
              type="number"
              placeholder="Quantity"
              value={quantities[product.id] || 0}
            />
            <button
              onClick={() =>
                handleAddToCart(
                  cart.id,
                  product.id,
                  quantities[product.id],
                  routeData?.customerId!
                )
              }
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
      <Pagination admin={true} currentPage={data.page!} totalPages={data.totalPages!} />
    </div>
  );
};

export default ProductList;
