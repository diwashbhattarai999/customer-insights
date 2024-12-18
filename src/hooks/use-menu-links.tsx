import { Grid, Settings, Users } from "lucide-react";

/**
 * Define menu links with icons, text, alert state, and path.
 */
const useMenuLinks = () => {
  return [
    {
      icon: <Grid className="size-6" />,
      text: "Dashboard",
      alert: false,
      path: "/",
    },
    {
      icon: <Users className="size-6" />,
      text: "Customer List",
      alert: false,
      path: "/customers",
    },
    {
      icon: <Settings className="size-6" />,
      text: "Settings",
      alert: false,
      path: "/settings",
    },
  ];
};

export default useMenuLinks;
