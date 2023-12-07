import type { Category } from "@prisma/client";
import { useClickOutside, useToggle } from "@reactuses/core";
import type { SerializeFrom } from "@remix-run/node";
import Hamburger from "hamburger-react";
import type { FC } from "react";
import { useRef } from "react";

import { useLocation } from "@remix-run/react";
import List from "./List";
import styles from "./styles.module.css";
export interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC<SerializeFrom<SidebarProps>> = ({ categories }) => {
  const navigation = useLocation();
  const [on, toggle] = useToggle(true);
  const refM = useRef(null);
  useClickOutside(refM, () => toggle(false));
  const links = categories.map((category) => ({
    slug: category.slug,
    label: category.name,
    url: `/products/`,
  }));
  return (
    <nav ref={refM} className={styles.gridSidebar}>
      <div className={styles.hidden}>
        <Hamburger color="#ffffff" toggled={on} size={20} toggle={toggle} />
      </div>
      {on && (
        <List
          links={links}
          navigation={navigation}
          isHamburger={true}
          isOpen={on}
          toggle={toggle}
        />
      )}
      <List
        links={links}
        navigation={navigation}
        isHamburger={false}
        isOpen={true}
        toggle={toggle}
      />
    </nav>
  );
};

export default Sidebar;
