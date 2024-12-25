import { useRef, useState } from 'react';

import { Bell, Menu, Search, Settings, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useOnClickOutside from '@/hooks/use-on-click-outside';

import HamburgerMenu from './HamburgerMenu';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(searchRef, () => {
    setSearchOpen(false);
  });

  return (
    <div className="relative border-b border-border/30 px-4 py-5 md:px-10 md:py-7">
      <div className="flex items-center justify-between">
        {/* Hamburger Menu */}
        <Button
          className="block p-2 text-muted-foreground md:hidden"
          variant="ghost"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>

        {/* Notification, Settings, and Search Icons (Small Screens) */}
        <div className="flex items-center justify-between gap-1 md:hidden">
          <Button className="rounded-full p-2 text-muted-foreground" variant={'ghost'}>
            <Bell className="size-5" />
          </Button>
          <Button
            className="p-2 text-muted-foreground"
            variant="ghost"
            onClick={() => {
              setSearchOpen(!searchOpen);
            }}
          >
            <Search className="size-5" />
          </Button>

          <UserMenu />
        </div>

        {/* Absolute Search Box (Small Screens) */}
        {searchOpen && (
          <div
            ref={searchRef}
            className="absolute left-0 top-2 z-50 mx-2 rounded-lg border border-border bg-white p-3 shadow-md"
          >
            <div className="flex items-center gap-2">
              <Input
                className="flex-1"
                placeholder="Search..."
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button
                className="w-fit"
                onClick={() => {
                  console.log('Searching for:', search);
                }}
              >
                <Search className="size-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Full Search Bar (Large Screens) */}
        <div className="hidden w-full max-w-md items-center gap-2 md:flex">
          <Input
            className="bg-muted/20"
            placeholder="Search..."
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            className="w-fit"
            onClick={() => {
              console.log('Searching for:', search);
            }}
          >
            Search
          </Button>
        </div>

        {/* Notification, Settings Icons, and User Menu (Large Screens) */}
        <div className=" hidden items-center gap-4 md:flex">
          <Button className="rounded-full p-2 text-muted-foreground" variant={'ghost'}>
            <Bell className="size-5" />
          </Button>
          <Button className="rounded-full p-2 text-muted-foreground" variant={'ghost'}>
            <Settings className="size-5" />
          </Button>

          {/* User Icon with Dropdown Menu */}
          <UserMenu />
        </div>
      </div>

      {/* Sliding Hamburger Menu */}
      <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}
