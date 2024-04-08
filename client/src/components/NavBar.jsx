import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

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
        <button className="group text-gray-300 px-1 outline-none rounded-sm hover:text-gray-50 focus-visible:text-gray-50 focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange">
          <ChevronDownIcon className="block size-4 stroke-2 group-data-[state=open]:rotate-180  transition-transform" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="space-y-2 bg-white  rounded-lg shadow-lg p-4 text-stone-700"
        >
          {subLinks.map((link) => (
            <DropdownMenu.Item asChild>
              <NavLink
                to={link.href}
                className={({ isActive }) => {
                  return `group text-sm font-semibold leading-none rounded-sm flex items-center  p-2 outline-none hover:bg-stone-100 focus-visible:bg-stone-100  ${
                    isActive ? "bg-stone-100" : ""
                  } `;
                }}
              >
                {link.label}
                <div className="ml-auto pl-5">
                  <ChevronRightIcon className="size-4 text-stone-500 group-focus-visible:text-stone-600 group-focus-visible:translate-x-0.5 group-hover:text-stone-600  group-hover:translate-x-0.5 transition-all" />
                </div>
              </NavLink>
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
      <NavLink
        to={href}
        className={({ isActive }) =>
          `inline-block text-base py-2 px-3 outline-none rounded-sm hover:text-gray-50 focus-visible:text-gray-50 focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange ${
            isActive ? "text-gray-50" : "text-gray-300"
          } `
        }
      >
        {children}
      </NavLink>
      <Dropdown subLinks={subLinks} />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="bg-stone-700 p-4">
      <div className="max-w-7xl mx-auto flex items-baseline">
        <Link
          className="text-custom-orange text-xl font-bold outline-none rounded-sm focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange"
          to="/"
        >
          CVNews
        </Link>
        <ul className="ml-auto flex gap-6">
          {LINKS.map((link) => {
            return (
              <li>
                {"subLinks" in link ? (
                  <NavDropdown href={link.href} subLinks={link.subLinks}>
                    {link.label}
                  </NavDropdown>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `inline-block  text-base py-2 px-3 outline-none rounded-sm     hover:text-gray-50 focus-visible:text-gray-50 focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange ${
                        isActive ? "text-gray-50" : "text-gray-300"
                      }`
                    }
                    to={link.href}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            );
          })}
          <li>
            <button className="text-base border-2 py-2 px-3 border-stone-400 rounded outline-none transition-colors text-gray-100 hover:bg-custom-orange hover:border-transparent hover:text-gray-50 focus-visible:border-custom-orange">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
