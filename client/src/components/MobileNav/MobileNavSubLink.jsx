import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";

export default function MobileNavSubLink({ href, children, closeNav }) {
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
      className={({ isActive }) => {
        return `group text-sm font-semibold leading-none rounded-sm flex items-center p-2 outline-none hover:bg-stone-100 focus-visible:bg-stone-100  ${
          isActive ? "bg-stone-100" : ""
        } `;
      }}
    >
      {children}
      <div className="ml-auto pl-5">
        <ChevronRightIcon className="size-4 text-stone-500 group-focus-visible:text-stone-600 group-focus-visible:translate-x-0.5 group-hover:text-stone-600  group-hover:translate-x-0.5 transition-all" />
      </div>
    </NavLink>
  );
}
