import React from "react";
import { Link, redirect, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import AuthError from "../components/Auth/AuthError";
import {
  PROHIBITED_PASSWORDS,
  formValidationErrorResponse,
  sanitizeFormData,
} from "../lib/formHelpers";

export async function action({ request }) {
  /*
    Going through the form entries and removing any extra whitespace.  Gets rid of some edge cases
      From client: formData: [["password", "     password1234556 "]]
      after trimming whitespace: [["password", "password1234556"]]
  */
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
  if (password.length < 12) {
    formValidationErrorResponse({
      data: { email },
      message: "Password must be atleast 12 characters!",
    });
  }
  // prevents the use of prohibited passwords
  if (
    PROHIBITED_PASSWORDS.some((badPassword) => password.includes(badPassword))
  ) {
    formValidationErrorResponse({
      data: { email },
      message: `Passwords can't contain the following sequences ${PROHIBITED_PASSWORDS.join(
        ","
      )}`,
    });
  }
  // checks if the password contains a special character
  if (/[^\w\d]/.test(password) === false) {
    formValidationErrorResponse({
      data: { email },
      message: "Password must contain a special character!",
    });
  }
  if (password !== confirmPassword) {
    formValidationErrorResponse({
      data: { email },
      message: "Password must match!",
    });
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify({ email, password: trimmedPassword }),
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
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
          defaultValue={error ? formError.data.email : ""}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
        />
        <AuthInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          label="Password"
        />
      </div>
      {error && <AuthError error={formError.message} />}
      <button className="block shadow-brown shadow-lg w-1/2 py-2 mx-auto mb-4 bg-brown-300 text-white rounded">
        Register
      </button>
      <label class="checkbox-container">
        <input type="checkbox" class="accent-brown-100" />
        Business Account?
      </label>
      <div className="flex flex-col items-center gap-2">
        <Link className="text-sm text-brown-100">
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
