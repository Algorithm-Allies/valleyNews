import { Link, useRouteError } from "react-router-dom";
import FormError from "../components/FormError";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import {
  formValidationErrorResponse,
  sanitizeFormData,
  validatePassword,
} from "../lib/formHelpers";

export async function action({ request }) {
  const formData = sanitizeFormData(await request.formData());
  const { password, confirmPassword } = Object.fromEntries(formData);

  if (!password || !confirmPassword) {
    formValidationErrorResponse({
      message: "Please enter your new password and confimation password!",
    });
  }
  if (password !== confirmPassword) {
    formValidationErrorResponse({
      message: "Passwords don't match!",
    });
  }
  const { valid, message } = validatePassword(password);

  if (!valid) {
    formValidationErrorResponse({
      message,
    });
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/users/new-password`,
    {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // If, the user was succesful in logging in, we redirect them to home page
  if (res.ok) {
    return redirect("/");
  }
  // Otherwise, something went wrong on the server, we will return whatever message the server returns.  For example, email already in use.
  formValidationErrorResponse({
    message: "The server error message",
  });
}

function NewPassword() {
  const error = useRouteError();
  let formError;
  if (error) {
    formError = JSON.parse(error.data);
  }
  return (
    <AuthForm>
      <div className="mb-4 text-center space-y-1">
        <h2 className="text-white text-xl">Change your password</h2>
        <p className="text-brown-100 text-sm">
          Enter a new password below to change your password
        </p>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <AuthInput
          key={Math.random()}
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
        />
        <AuthInput
          key={Math.random()}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          label="Confirm Password"
        />
      </div>
      {error && (
        <div className="mb-4">
          <FormError formError={formError.message} />
        </div>
      )}
      <button className="block shadow-brown shadow-lg w-1/2 py-2 mx-auto mb-4 bg-brown-300 text-white rounded">
        Confirm
      </button>
      <div className="flex flex-col items-center gap-2 mt-4">
        <Link to="/auth/login" className="text-sm text-brown-100">
          Already have an account? Click Here
        </Link>
        <Link to="/auth/register" className="text-sm text-brown-100">
          Need an account? Click Here
        </Link>
      </div>
    </AuthForm>
  );
}
export default NewPassword;
