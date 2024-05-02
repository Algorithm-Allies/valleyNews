import React from "react";

import DesktopNav from "./DesktopNav/DesktopNav";
import MobileNav from "./MobileNav/MobileNav";
import { useUser } from "../hooks/useUserContext";

const LINKS = [
  {
    label: "News",
    href: "/news",
    subLinks: [
      { label: "Local", href: "/news/local" },
      { label: "Crime", href: "/news/crime" },
      { label: "Government", href: "/news/government" },
      { label: "Education", href: "/news/education" },
    ],
  },
  {
    label: "Sports",
    href: "/sports",
    subLinks: [
      { label: "High School", href: "/sports/high-school" },
      { label: "Local", href: "/sports/local" },
    ],
  },
  {
    label: "Staff",
    href: "/staff",
  },
  {
    label: "Business",
    href: "/businesspanel",
    subLinks: [{ label: "Users", href: "/users" }],
  },
];

function NavBar() {
  const { businessId } = useUser();
  const links = LINKS.filter((link) => {
    return link.label === "Business"
      ? businessId !== null
        ? true
        : false
      : true;
  });
  return (
    <nav className="bg-stone-700 p-4">
      <DesktopNav links={links} />
      <MobileNav links={links} />
    </nav>
  );
}

export default NavBar;
