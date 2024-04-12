import { NavLink } from "react-router-dom";

export default function DesktopNavLink({ href, children }) {
  return (
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
  );
}
