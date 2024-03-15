import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
function FormError({ formError }) {
  return (
    <div className="relative w-full min-h-10 p-2 flex gap-2 items-center bg-yellow-600 rounded">
      <div
        className={
          Array.isArray(formError) ? "absolute top-2 right-2" : "shrink-0"
        }
      >
        <ExclamationTriangleIcon className="text-yellow-900 size-4" />
      </div>
      {Array.isArray(formError) ? (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-pretty text-brown-100">{formError[0]}:</p>
          <ul className="flex flex-col gap-2 pl-2">
            {formError.slice(1).map((errorMessage, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-xs text-brown-100"
              >
                <div className="size-1 bg-brown-100 rounded-full"></div>
                {errorMessage}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-white">{formError}</p>
      )}
    </div>
  );
}
export default FormError;
