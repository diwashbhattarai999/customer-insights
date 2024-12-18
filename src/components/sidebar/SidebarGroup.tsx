import { createContext, useState, ReactNode, useLayoutEffect } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const SidebarContext = createContext<{ expanded: boolean }>({
  expanded: true,
});

interface ISidebarGroupProps {
  children: ReactNode;
}

/**
 * Sidebar component that contains the sidebar navigation for dashboard.
 */
const SidebarGroup = ({ children }: ISidebarGroupProps) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const handleResize = () => setExpanded(window.innerWidth >= 1200);

    handleResize(); // Set initial state
    setLoading(false); // Hide loading state

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return null;

  return (
    <aside className="sticky inset-0 z-40 hidden h-screen md:block">
      <nav className="flex h-full w-fit flex-col bg-sidebar px-[18px] py-6 shadow-sm">
        <div
          className={cn("relative flex items-center pb-10", {
            "justify-between": expanded,
          })}
        >
          <div
            className={cn(
              "mt-1.5 ml-1.5 w-full transition-all text-2xl font-semibold text-foreground/80"
            )}
          >
            {expanded ? "Customer Insights" : "CI"}
          </div>
          <ToggleButton
            expanded={expanded}
            onClick={() => setExpanded((curr) => !curr)}
          />
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <div className="h-full flex-1">{children}</div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

const ToggleButton = ({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    className={cn(
      "absolute -right-8 top-1.5 hidden rounded-lg border border-solid border-border bg-muted hover:bg-foreground/10 transition-all p-1 h-auto text-muted-foreground lg:block 3xl:hidden"
    )}
  >
    <ChevronRight
      className={cn("transition-all duration-100 size-6", {
        "rotate-180": expanded,
      })}
      size={24}
    />
  </Button>
);

export default SidebarGroup;
