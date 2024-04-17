import { NavLink, useNavigate } from "react-router-dom";

export default function MobileNavLink({ href, closeNav, children }) {
  const navigate = useNavigate();
  return (
    <NavLink
      // intercept the link request and use reacts router navigation and close the nav.
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
        closeNav();
      }}
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
