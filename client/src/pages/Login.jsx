import { Link, redirect, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import FormError from "../components/FormError";
import {
  formValidationErrorResponse,
  sanitizeFormData,
} from "../lib/formHelpers";
import AuthButton from "../components/Auth/AuthButton";
import { useEffect } from "react";

export async function action({ request }) {
  const formData = sanitizeFormData(await request.formData());
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
    formValidationErrorResponse({
      data: { email },
      message: "Please enter your email and password",
    });
  }
  const req = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(req);

  console.log("testing");

  // If, the user was succesful in logging in, we redirect them to home page
  if (req.ok) {
    console.log("ok");
    const res = await req.json();
    localStorage.setItem(
      "user",
      JSON.stringify({ userId: res.userId, businessId: res.businessId })
    );
    localStorage.setItem("token", res.token);
    return redirect("/news");
  }
  console.log("what");
  const { message } = await req.json();

  // Otherwise, something went wrong on the server, we will return whatever message the server returns.  For example, email already in use.

  formValidationErrorResponse({
    data: { email },
    message,
  });
}

function Login() {
  const error = useRouteError();
  console.log(error);

  let formError;
  if (error) {
    formError = JSON.parse(error.data);
  }

  return (
    <AuthForm key={error}>
      <h2 className="text-white text-xl text-center mb-4">
        Login to your Account
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
          key={Math.random()}
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
        />
      </div>
      {error && (
        <div className="mb-4">
          <FormError formError={formError.message} />
        </div>
      )}
      <AuthButton>Login</AuthButton>
      <div className="flex flex-col items-center gap-2 mt-4">
        <Link to="/auth/reset" className="text-sm text-brown-100">
          Forgot your password? Click Here
        </Link>
        <Link to="/auth/register" className="text-sm text-brown-100">
          Need an account? Click Here
        </Link>
      </div>
    </AuthForm>
  );
}

export default Login;
