import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

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
      { label: "High School", href: "/sports/highschool" },
      { label: "Local", href: "/sports/local" },
    ],
  },
  {
    label: "Staff",
    href: "/staff",
  },
];

function Dropdown({ subLinks }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="group text-gray-100 px-1 outline-none">
          <ChevronDownIcon className="block size-4 stroke-2 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="space-y-2 bg-white  rounded-lg shadow-lg p-4 text-stone-700"
        >
          {subLinks.map((link) => (
            <DropdownMenu.Item asChild>
              <Link
                to={link.href}
                className="group text-sm font-semibold leading-none rounded-sm flex items-center  p-2 outline-none hover:bg-stone-100"
              >
                {link.label}
                <div className="ml-auto pl-5">
                  <ChevronRightIcon className="size-4 text-stone-500 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function NavDropdown({ children, href, subLinks }) {
  return (
    <div className="flex items-center">
      <Link to={href} className="inline-block text-base p-2">
        {children}
      </Link>
      <Dropdown subLinks={subLinks} />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="bg-stone-700 p-4">
      <div className="max-w-7xl mx-auto flex items-baseline">
        <Link className=" text-custom-orange text-xl font-bold" to="/">
          CVNews
        </Link>
        <ul className="ml-auto flex gap-6 text-gray-50">
          {LINKS.map((link) => {
            return (
              <li>
                {"subLinks" in link ? (
                  <NavDropdown href={link.href} subLinks={link.subLinks}>
                    {link.label}
                  </NavDropdown>
                ) : (
                  <Link className="inline-block text-base p-2" to={link.href}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            <button className="text-base border py-2 px-4 border-stone-400 rounded">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
