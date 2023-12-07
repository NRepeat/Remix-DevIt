import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="footer-content">
        <div className="footer-logo">Footer</div>
        <div className="footer-links">
          <Link to={"/products"}>Home</Link>
          <Link to={"/"}>About Us</Link>
          <Link to={"/"}>Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
