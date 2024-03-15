import React from "react";
import { Link, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import {
  formValidationErrorResponse,
  sanitizeFormData,
} from "../lib/formHelpers";
import FormError from "../components/FormError";

export async function action({ request }) {
  const formData = sanitizeFormData(await request.formData());
  const { email } = Object.fromEntries(formData);
  if (!email) {
    formValidationErrorResponse({
      message: "Please enter your email to reset your password!",
    });
  }
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/users/new-password`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
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

function ResetPassword() {
  const error = useRouteError();
  let formError;
  if (error) {
    formError = JSON.parse(error.data);
  }
  return (
    <AuthForm>
      <h2 className="text-white text-xl text-center mb-4">
        Reset Account Password
      </h2>
      <div className="flex flex-col gap-4 mb-6">
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
        />
      </div>
      {error && (
        <div className="mb-4">
          <FormError formError={formError.message} />
        </div>
      )}
      <button className="block shadow-brown shadow-lg w-1/2 py-2 mx-auto mb-4 bg-brown-300 text-white rounded">
        Send Reset Link
      </button>
      <div className="flex flex-col items-center gap-2">
        <Link to="/auth/reset" className="text-sm text-brown-100">
          Forgot your password? Click Here
        </Link>
        <Link to="/auth/login" className="text-sm text-brown-100">
          Already have an account? Click Here
        </Link>
      </div>
    </AuthForm>
  );
}

export default ResetPassword;
