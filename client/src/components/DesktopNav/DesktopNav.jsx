import { Link } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import DesktopNavLink from "./DesktopNavLink";

export default function DesktopNav({ links }) {
  return (
    <div className="hidden lg:flex lg:max-w-7xl lg:mx-auto lg:items-baseline">
      <Link
        className="text-custom-orange text-xl font-bold outline-none rounded-sm focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange"
        to="/"
      >
        CVNews
      </Link>
      <ul className="ml-auto flex gap-6">
        {links.map((link) => {
          return (
            <li key={link.href}>
              {"subLinks" in link ? (
                <NavDropdown href={link.href} subLinks={link.subLinks}>
                  {link.label}
                </NavDropdown>
              ) : (
                <DesktopNavLink href={link.href}>{link.label}</DesktopNavLink>
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
  );
}
