import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { type FC } from "react";
import SearchIcon from "~/icons/Header/Search";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import { SearchBar } from "../../Ui/SearchBar/SearchBar";
import { CartIcon } from "../CartInfo/CartInfo";
import styles from "./styles.module.css";

type StoreHeaderProps = {
  customer?: SerializeFrom<CustomerWithoutPassword | null>;
};

const isCustomerAuthenticated: FC<{ isCustomer: boolean }> = ({
  isCustomer,
}) => {
  return isCustomer ? (
    <Link to={"/"}>Profile</Link>
  ) : (
    <Link to={"/login"}>Sign in</Link>
  );
};

const StoreHeader: FC<StoreHeaderProps> = ({ customer }) => {
  return (
    <div className={styles.header}>
      <div className={styles.searchBarContainer}>
        <SearchIcon className={styles.searchIcon} />

        <SearchBar className={styles.searchBar} action="/search/" />
      </div>
      <Link className={styles.title} to={"/"}>
        STORE
      </Link>

      <div className={styles.menu}>
        {isCustomerAuthenticated({ isCustomer: !!customer })}
        <CartIcon />
      </div>
    </div>
  );
};

export default StoreHeader;
