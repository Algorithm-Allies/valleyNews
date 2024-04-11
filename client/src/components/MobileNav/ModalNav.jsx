import * as Dialog from "@radix-ui/react-dialog";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MobileNavLink from "./MobileNavLink";
import MobileNavSubLink from "./MobileNavSubLink";
export default function ModalNav({ links }) {
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
            <ModalLinks links={links} />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ModalLinks({ links }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => {
        return (
          <li key={link.href}>
            {"subLinks" in link ? (
              <div>
                <MobileNavLink href={link.href}>{link.label}</MobileNavLink>
                <ul className="ml-6 space-y-2 my-2">
                  {link.subLinks.map(({ href, label }) => (
                    <MobileNavSubLink key={href} href={href}>
                      {label}
                    </MobileNavSubLink>
                  ))}
                </ul>
              </div>
            ) : (
              <MobileNavLink href={link.href}>{link.label}</MobileNavLink>
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
