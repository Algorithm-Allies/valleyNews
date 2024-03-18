import React from "react";
import { Link, redirect, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import FormError from "../components/FormError";
import {
  formValidationErrorResponse,
  sanitizeFormData,
  validatePassword,
} from "../lib/formHelpers";
import AuthButton from "../components/Auth/AuthButton";

export async function action({ request }) {
  const formData = sanitizeFormData(await request.formData());
  const { email, password, confirmPassword } = Object.fromEntries(formData);
  // email, password, and confirm password all are required
  if (!password || !email || !confirmPassword) {
    formValidationErrorResponse({
      data: {
        email,
      },
      message: "Please enter email, password, and confirmation password",
    });
  }
  if (password !== confirmPassword) {
    formValidationErrorResponse({
      data: { email },
      message: "Password don't match!",
    });
  }
  const { valid, message } = validatePassword(password);
  if (!valid) {
    formValidationErrorResponse({
      data: { email },
      message,
    });
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // If, the user was succesful in registering in, we redirect them to home page
  if (res.ok) {
    return redirect("/");
  }
  // Otherwise, something went wrong on the server, we will return whatever message the server returns.  For example, email already in use.
  formValidationErrorResponse({
    data: { email },
    message: "The server error message",
  });
}

function Register() {
  const error = useRouteError();
  let formError;
  if (error) {
    formError = JSON.parse(error.data);
  }

  return (
    <AuthForm>
      <h2 className="text-white text-xl text-center mb-4">
        Register Account to Valley News
      </h2>
      <div className="flex flex-col gap-4 mb-6">
        {/* I don't do it on email because I want to email to persist between form request. I think it would be bad UX if they had to re-enter their email every time. */}
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
          defaultValue={error ? formError?.data?.email : ""}
        />
        {/* I use Math.random() becasue I want to create a new instance of AuthInput every time the form renders.
          So, that way the password fields are always reset when they submit the form request and it is a bad request.
        */}
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
          label="Password"
        />
      </div>
      {error && (
        <div className="mb-4">
          <FormError formError={formError.message} />
        </div>
      )}
      <AuthButton>Register</AuthButton>

      <label className="checkbox-container">
        <input type="checkbox" className="accent-brown-100" />
        Business Account?
      </label>
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

export default Register;
