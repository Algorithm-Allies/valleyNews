import React from "react";

import DesktopNav from "./DesktopNav/DesktopNav";
import MobileNav from "./MobileNav/MobileNav";

const LINKS = [
  {
    label: "Home",
    href: "/",
  },
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
];

function NavBar() {
  return (
    <nav className="bg-stone-700 p-4">
      <DesktopNav links={LINKS} />
      <MobileNav links={LINKS} />
    </nav>
  );
}

export default NavBar;
