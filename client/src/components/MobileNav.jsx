import {
  Bars3Icon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, NavLink } from "react-router-dom";
export default function MobileNav({ links }) {
  return (
    <div className="flex items-center lg:hidden">
      <Link
        className="text-custom-orange text-xl font-bold outline-none rounded-sm focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange"
        to="/"
      >
        CVNews
      </Link>
      <ModalNav>
        <ModalLinks />
      </ModalNav>
    </div>
  );
}

function ModalLinks() {
  return (
    <ul className="space-y-3">
      {links.map((link) => {
        return (
          <li key={link.href}>
            {"subLinks" in link ? (
              <div>
                <NavLink
                  className={({ isActive }) =>
                    `inline-block  text-base py-2 px-3 outline-none rounded-sm     hover:text-custom-orange focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange ${
                      isActive ? "text-gray-900" : "text-gray-600"
                    }`
                  }
                  to={link.href}
                >
                  {link.label}
                </NavLink>
                <ul className="ml-6 space-y-2 my-2">
                  {link.subLinks.map(({ href, label }) => (
                    <NavLink
                      key={href}
                      to={href}
                      className={({ isActive }) => {
                        return `group text-sm font-semibold leading-none rounded-sm flex items-center   p-2 outline-none hover:bg-stone-100 focus-visible:bg-stone-100  ${
                          isActive ? "bg-stone-100" : ""
                        } `;
                      }}
                    >
                      {label}
                      <div className="ml-auto pl-5">
                        <ChevronRightIcon className="size-4 text-stone-500 group-focus-visible:text-stone-600 group-focus-visible:translate-x-0.5 group-hover:text-stone-600  group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </NavLink>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `inline-block  text-base py-2 px-3 outline-none rounded-sm hover:text-custom-orange focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange ${
                    isActive ? "text-custom-orange" : "text-gray-700"
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
      <li className="my-2">
        <button className="w-full border-2 border-gray-400 py-2 rounded-sm outline-none transition-colors text-gray-700 hover:bg-custom-orange hover:border-transparent hover:text-white  focus-visible:border-custom-orange">
          Logout
        </button>
      </li>
    </ul>
  );
}

function ModalNav({ children }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="group ml-auto outline-none rounded-sm  focus-visible:outline focus-visble:outline-1  focus-visible:outline-custom-orange">
        <Bars3Icon className="size-6 fill-gray-300 group-hover:fill-gray-50 group-focus-visible:fill-gray-50" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content asChild>
          <nav className="fixed top-4 right-4 w-full max-w-xs bg-white text-stone-900 rounded-lg shadow-lg p-6 text-base font-semibold">
            <Dialog.Close className="absolute top-7 right-6 size-8  flex items-center justify-center text-gray-500 outline-none rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-custom-orange hover:text-gray-600">
              <span className="sr-only">Close Navigation</span>
              <XMarkIcon className="size-5 stroke-2 overflow-visible" />
            </Dialog.Close>
            {children}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
