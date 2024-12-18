import { useContext, ReactNode } from "react";

import { SidebarContext } from "./SidebarGroup";
import { cn } from "@/lib/utils";

export interface ISidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * SidebarItem component is a single item in the sidebar navigation.
 */
const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  onClick,
  disabled,
}: ISidebarItemProps) => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar component");
  }

  const { expanded } = context;

  return (
    <li
      className={cn({
        "pointer-events-none cursor-none opacity-50": disabled,
      })}
    >
      <button
        onClick={onClick}
        className={cn(
          "group relative my-1.5 flex w-fit cursor-pointer items-center gap-2 rounded-xl px-3 py-3.5 text-left font-medium capitalize text-muted-foreground transition-all hover:bg-accent/80",
          { "bg-accent text-primary": active }
        )}
      >
        {icon}

        {/* Text is shown when the sidebar is expanded and hidden when the sidebar is not expanded.*/}
        <span
          className={cn(
            "overflow-hidden text-nowrap transition-all text-foreground",
            expanded ? "ml-4 w-44" : "-ml-2 w-0"
          )}
        >
          {text}
        </span>

        {/* Alert indicator */}
        {alert && (
          <div
            className={cn(
              "absolute right-2 h-2 w-2 rounded bg-primary",
              expanded ? "" : "top-2"
            )}
          />
        )}

        {/* Tooltip */}
        {!expanded && (
          <div className="invisible absolute left-full ml-6 -translate-x-3 text-nowrap rounded-md bg-muted px-2 py-1 text-sm font-medium text-primary opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
            {text}
          </div>
        )}
      </button>
    </li>
  );
};

export default SidebarItem;
