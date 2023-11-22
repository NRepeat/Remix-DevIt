import { FC } from "react";
import styles from "./styles.module.css";
import { CartIcon } from "../CartInfo/CartInfo";
import { Form, Link, useNavigation} from "@remix-run/react";



const Header:FC = () => {
  const navigation = useNavigation();

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );
  return (
    <div className={styles.header}>
      <div className={styles.topBar}>
        <Link to={'/'}> 
        <p className={styles.title}>Store</p>
        </Link>
        <Form className={styles.serch}  action="/search" role="search">
              <input
               className={searching ? "loading" : ""}
                aria-label="Search contacts"
                defaultValue={""}
                name="q"
                placeholder="Search"
                type="search"
              />
            </Form>
        <CartIcon />
      </div>
    </div>
  );
};

export default Header;
