import { Link, useLocation } from "react-router";

import useMenuLinks from "@/hooks/use-menu-links";

import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { pathname } = useLocation();

  const MENU_LINKS = useMenuLinks();

  return (
    <SidebarGroup>
      {MENU_LINKS.map((item, index) => {
        return (
          <Link to={item.path} key={index}>
            <SidebarItem
              icon={item.icon}
              text={item.text}
              active={item.path === pathname}
              alert={item.alert}
            />
          </Link>
        );
      })}
    </SidebarGroup>
  );
};

export default Sidebar;
