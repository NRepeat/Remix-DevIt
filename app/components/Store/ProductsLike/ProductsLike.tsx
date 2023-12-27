import type { SerializeFrom } from "@remix-run/node";
import { Link, useRouteLoaderData } from "@remix-run/react";
import { type FC } from "react";
import type { loader } from "~/root";
import { type ProductData } from "~/services/product.server";
import ProductListItem from "../ProductsList/ProductListItem/ProductListItem";
import styles from "./styles.module.css";

type ProductsLikeProps = {
  data?: SerializeFrom<ProductData>;
};

const ProductsLike: FC<ProductsLikeProps> = ({ data }) => {
  const routeData = useRouteLoaderData<typeof loader>("root");

  return (
    <>
      {data ? (
        <div className={styles.like}>
          <p className={styles.title}>You may also like </p>
          <div className={styles.container}>
            {data.products.map((product) => (
              <ProductListItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.like}>
          <p className={styles.title}>
            You can find something else in this categories{" "}
          </p>
          <div className={styles.error}>
            {routeData?.categories.map((category) => (
              <Link
                to={`/categories/${category.slug}`}
                className={styles.link}
                key={category.id}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsLike;
