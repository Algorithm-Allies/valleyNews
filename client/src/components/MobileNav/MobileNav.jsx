import { Link } from "react-router-dom";
import ModalNav from "./ModalNav";

export default function MobileNav({ links }) {
  return (
    <div className="flex items-center lg:hidden">
      <Link
        className="text-custom-orange text-xl font-bold outline-none rounded-sm focus-visible:outline-none focus-visible:outline focus-visble:outline-1 focus-visible:outline-custom-orange"
        to="/"
      >
        CVNews
      </Link>
      <ModalNav links={links} />
    </div>
  );
}
