import type { Category } from "@prisma/client";
import { useClickOutside } from "@reactuses/core";
import type { SerializeFrom } from "@remix-run/node";
import Hamburger from "hamburger-react";
import type { FC } from "react";
import { useRef, useState } from "react";

import { useLocation } from "@remix-run/react";
import List from "./List";
import styles from "./styles.module.css";
export interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC<SerializeFrom<SidebarProps>> = ({ categories }) => {
  const [isOpen, setOpen] = useState(false);
  const navigation = useLocation();
  const refM = useRef(null);
  useClickOutside(refM, () => setOpen((prev) => !prev));
  const links = categories.map((category) => ({
    slug: category.slug,
    label: category.name,
    url: `/products/`,
  }));
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
          links={links}
          navigation={navigation}
          isHamburger={true}
          isOpen={isOpen}
        />
      )}
      <List
        links={links}
        navigation={navigation}
        isHamburger={false}
        isOpen={true}
      />
    </nav>
  );
};

export default Sidebar;
