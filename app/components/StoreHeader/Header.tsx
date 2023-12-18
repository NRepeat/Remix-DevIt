import type { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import type { FC } from "react";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import type { Member } from "~/services/member.server";
import { SearchBar } from "../SearchBar/SearchBar";
import { CartIcon } from "../Store/CartInfo/CartInfo";
import styles from "./styles.module.css";

type StoreHeaderProps = {
  user?: CustomerWithoutPassword | Member | null;
};

const StoreHeader: FC<SerializeFrom<StoreHeaderProps>> = ({ user }) => {
  const submit = useSubmit();
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <Link className={styles.title} to={"/products"}>
          <h1>Store</h1>
        </Link>
      </div>

      <div className={styles.searchBarCartWrapper}>
        <SearchBar action="/products/" />
        <CartIcon />
        {user ? (
          <button
            className={styles.btn}
            onClick={() => submit({}, { action: "/logout", method: "post" })}
          >
            Logout
          </button>
        ) : (
          <Link className={styles.btn} to={"/login"}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default StoreHeader;
