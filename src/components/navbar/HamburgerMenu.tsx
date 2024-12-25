import { useRef } from 'react';
import { Link, useLocation } from 'react-router';

import { X } from 'lucide-react';

import useMenuLinks from '@/hooks/use-menu-links';
import useOnClickOutside from '@/hooks/use-on-click-outside';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

interface IHambugerMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const HamburgerMenu = ({ menuOpen, setMenuOpen }: IHambugerMenuProps) => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => {
    setMenuOpen(false);
  });

  const menuLinks = useMenuLinks();

  return (
    <div
      ref={menuRef}
      className={cn(
        'absolute left-0 top-0 z-40 h-[85vh] w-full bg-background p-6 shadow-md transition-transform duration-500 md:hidden',
        {
          'translate-y-0': menuOpen,
          '-translate-y-full': !menuOpen,
        }
      )}
    >
      <div className="mb-8 flex items-center justify-between">
        <Link className="text-2xl font-semibold text-primary" to="/">
          Customer Insights
        </Link>

        <Button
          className="p-0"
          variant={'ghost'}
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <ul className="flex flex-col gap-3">
        {menuLinks.map((link, index) => (
          <li
            key={index}
            className={cn(
              'flex items-center gap-4 rounded-lg px-2 py-3 hover:bg-muted hover:text-primary',
              { 'bg-muted text-primary': isActive(link.path) }
            )}
          >
            {link.icon}
            <Link className="font-medium" to={link.path}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
