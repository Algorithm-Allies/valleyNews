import { NavLink } from "react-router-dom";

export default function MobileNavLink({ href, children }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `inline-block text-base py-2 px-3 outline-none rounded-sm hover:text-custom-orange  focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange ${
          isActive ? "text-custom-orange" : "text-gray-700"
        } `
      }
    >
      {children}
    </NavLink>
  );
}
