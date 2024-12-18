import { useState } from 'react';
import { Link } from 'react-router';

import { Bell, Search, Settings, User } from 'lucide-react';

import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';

export default function Navbar() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center justify-between border-b border-border/30 px-10 py-7">
      {/* Search Bar */}
      <div className="flex w-full items-center gap-2">
        <div className="relative w-full max-w-md">
          <Input
            className="bg-muted/20"
            placeholder="Search..."
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <Button
          className="w-fit"
          onClick={() => {
            console.log('Searching for:', search);
          }}
        >
          Search
          <Search className="size-5" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button className="rounded-full p-2 text-muted-foreground" variant={'ghost'}>
          <Bell className="h-5 w-5" />
        </Button>
        <Button className="rounded-full p-2 text-muted-foreground" variant={'ghost'}>
          <Settings className="h-5 w-5" />
        </Button>

        {/* Profile / Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
            <User className="size-10 cursor-pointer rounded-full border p-1.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52" sideOffset={5}>
            {/* User Detail like name & email */}
            <DropdownMenuLabel>
              <div className="flex flex-col items-start">
                <span className="text-base font-semibold">John Doe</span>
                <span className="text-muted-foreground">diwashb999@gmail.com</span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="py-3">
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3">
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
