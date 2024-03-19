import { CheckCircleIcon } from "@heroicons/react/24/solid";
function FormSuccess({ email }) {
  return (
    <div className="relative w-full min-h-10 p-2 gap-2 items-center bg-[#ccb494] text-white rounded">
      <h3 className="text-base font-bold mb-1">Verify your email address</h3>
      <div className="space-y-2">
        <p className="text-xs mb-2">
          To start using ValleyNews, confirm you email address we sent to:
        </p>
        <p className="text-xs font-bold">{email}</p>
      </div>
      <div className="absolute right-2 top-2">
        <CheckCircleIcon className="text-gray-100 size-4" />
      </div>
    </div>
  );
}
export default FormSuccess;
