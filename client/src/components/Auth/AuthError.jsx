import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
function AuthError({ error }) {
  return (
    <div className="w-full min-h-10 p-2 flex  gap-2 items-center bg-yellow-600 rounded  mb-4">
      <div className="size-4">
        <ExclamationTriangleIcon className="text-yellow-900" />
      </div>
      <p className="text-sm text-white">{error}</p>
    </div>
  );
}
export default AuthError;
