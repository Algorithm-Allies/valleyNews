import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";

export default function MobileNavSubLink({ href, children }) {
  return (
    <NavLink
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
