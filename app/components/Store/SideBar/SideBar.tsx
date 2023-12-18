import { useClickOutside, useToggle } from "@reactuses/core";
import type { SerializeFrom } from "@remix-run/node";
import Hamburger from "hamburger-react";
import type { FC } from "react";
import { useRef } from "react";

import { useLocation } from "@remix-run/react";
import List from "./List";
import styles from "./styles.module.css";
export interface SidebarProps {
  links: {
    slug: string;
    name: string;
  }[];
}

const Sidebar: FC<SerializeFrom<SidebarProps>> = ({ links }) => {
  const navigation = useLocation();
  const [on, toggle] = useToggle(true);
  const refM = useRef(null);
  useClickOutside(refM, () => toggle(false));
  const linksData = links.map((link) => ({
    slug: link.slug,
    label: link.name,
    url: `/products/`,
  }));
  return (
    <div ref={refM}>
      <div className={styles.hidden}>
        <Hamburger color="#ffffff" toggled={on} size={20} toggle={toggle} />
      </div>
      <nav className={styles.gridSidebar}>
        {on && (
          <List
            links={linksData}
            navigation={navigation}
            isHamburger={true}
            isOpen={on}
            toggle={toggle}
          />
        )}
        <List
          links={linksData}
          navigation={navigation}
          isHamburger={false}
          isOpen={true}
          toggle={toggle}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
