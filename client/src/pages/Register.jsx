import React, { useState } from "react";
import { Link, redirect, useActionData, useRouteError } from "react-router-dom";

import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import FormError from "../components/FormError";
import {
  formValidationErrorResponse,
  sanitizeFormData,
  validatePassword,
} from "../lib/formHelpers";
import AuthButton from "../components/Auth/AuthButton";
import FormSuccess from "../components/FormSuccess";

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
  // Just for testing to show the email verification message
  return { data: { email } };
  /*
const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // If, the user was succesful in registering in, we return their email to display in a verify message
  if (res.ok) {
    return { data: { email } };
  }
  // If, the user was not successful in registering in, we display the error message
  else {
    const errorResponse = await res.json();
    const errorMessage = errorResponse.message;

    formValidationErrorResponse({
      data: { email },
      message: errorMessage,
    });
  }
  */
}

function Register() {
  const error = useRouteError();
  const success = useActionData();
  let formError;
  if (error) {
    formError = JSON.parse(error.data);
  }
  const [businessCheck, setBusinessCheck] = useState(false);

  return (
    <AuthForm>
      <h2 className="text-white text-xl text-center mb-4">
        Register {businessCheck && "Business"} Account to Valley News
      </h2>
      <div className="flex flex-col gap-4 mb-6">
        {/* 
          I add defaultValue because when the user submits the form the email input is reset and I want the email value to persist between form request.  I think it would be bad UX if they had to re-enter their email every request.  I also change the key on a successful form request, thus causing a new instance of AuthInput and the email being reset, since they have already successfully registered otherwise the email value will persist.
        */}
        <AuthInput
          key={success ? "email" : Math.random()}
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
        {businessCheck && (
          <>
            <AuthInput
              key={Math.random()}
              type="tel"
              name="phone"
              placeholder="Mobile Phone Number"
              label="Mobile Phone Number"
            />
            <AuthInput
              key={Math.random()}
              type="text"
              name="business_name"
              placeholder="Business Name"
              label="Business Website"
            />
            <AuthInput
              key={Math.random()}
              type="url"
              name="business_website"
              placeholder="Business Website"
              label="Business Website"
            />
          </>
        )}
      </div>
      {error && (
        <div className="mb-4">
          <FormError formError={formError.message} />
        </div>
      )}
      {success && (
        <div className="mb-4">
          <FormSuccess email={success.data.email} />
        </div>
      )}
      <AuthButton>Register</AuthButton>
      <label className="checkbox-container">
        <input
          type="checkbox"
          className="accent-brown-100"
          onClick={() => setBusinessCheck(!businessCheck)}
        />
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
