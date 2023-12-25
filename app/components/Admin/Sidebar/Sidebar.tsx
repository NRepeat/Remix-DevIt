import { useClickOutside } from "@reactuses/core";
import { useLocation } from "@remix-run/react";
import Hamburger from "hamburger-react";
import type { FC } from "react";
import { useRef, useState } from "react";
import List from "./List";
import { svgAdminPanelIcons } from "./icons";
import styles from "./styles.module.css";

const Sidebar: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setOpen(false));
  const navigation = useLocation();
  const links = [
    { label: "Customers", url: "/admin/customers" },
    { label: "Products", url: "/admin/products" },
  ];
  return (
    <nav className={styles.gridSidebar}>
      <div className={styles.hidden}>
        <Hamburger
          color="#ffffff"
          toggled={isOpen}
          size={20}
          toggle={setOpen}
        />
      </div>
      {isOpen && (
        <List
          svgArray={svgAdminPanelIcons}
          links={links}
          navigation={navigation}
          isHamburger={true}
          isOpen={isOpen}
        />
      )}
      <List
        svgArray={svgAdminPanelIcons}
        links={links}
        navigation={navigation}
        isHamburger={false}
        isOpen={true}
      ></List>
    </nav>
  );
};

export default Sidebar;
