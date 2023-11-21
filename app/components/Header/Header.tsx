import { LinksFunction } from "@remix-run/node";
import styles from "./styles.module.css";




const Header = () => {
  return (
    <div>
      <p>Store</p>
    <form action="" role="serch">
        <input type="text" />
    </form>
   <button className={styles.cart}></button>
    </div>
  );
};

export default Header;
