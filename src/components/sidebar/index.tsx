import { Link, useLocation } from 'react-router';

import useMenuLinks from '@/hooks/use-menu-links';

import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { pathname } = useLocation();

  const MENU_LINKS = useMenuLinks();

  return (
    <SidebarGroup>
      {MENU_LINKS.map((item, index) => {
        const isActive = pathname === item.path || pathname.startsWith(item.path + '/');

        return (
          <Link key={index} to={item.path}>
            <SidebarItem active={isActive} alert={item.alert} icon={item.icon} text={item.text} />
          </Link>
        );
      })}
    </SidebarGroup>
  );
};

export default Sidebar;
