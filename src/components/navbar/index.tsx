import { Search, Bell, Settings, User } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between py-7 px-10 border-b border-border/30">
      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-muted/20"
          />
        </div>
        <Button
          onClick={() => console.log("Searching for:", search)}
          className="w-fit"
        >
          Search
          <Search className="size-5" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button
          variant={"ghost"}
          className="p-2 rounded-full text-muted-foreground"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant={"ghost"}
          className="p-2 rounded-full text-muted-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>

        {/* Profile / Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
            <User className="size-10 rounded-full border p-1.5 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={5} className="w-52">
            {/* User Detail like name & email */}
            <DropdownMenuLabel>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">John Doe</span>
                <span className="text-muted-foreground">
                  diwashb999@gmail.com
                </span>
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
