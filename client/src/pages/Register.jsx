import React from "react";
import { Link, redirect, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";


export async function action({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
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
  // Otherwise, something went wrong on the server and we throw an error. This error will show up in useRouterError
  throw new Response("Username and password don't match!", { status: 400 });
}

function Register() {
  const error = useRouteError();
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
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
        />
         <AuthInput
          type="password"
          name="password"
          placeholder="Confirm Password"
          label="Password"
        />
      </div>
      {error && <p>{error.data}</p>}
      <button className="block shadow-brown shadow-lg w-1/2 py-2 mx-auto mb-4 bg-brown-300 text-white rounded">
        Register
      </button>
      <label class="checkbox-container">
        <input type="checkbox" class="accent-brown-100"/> 
        Business Account?
      </label>
      <div className="flex flex-col items-center gap-2">
        <Link className="text-sm text-brown-100">
          Forgot your password? Click Here
        </Link>
        <Link to="/login" className="text-sm text-brown-100">
          Already have an account? Click Here
        </Link>
      </div>
    </AuthForm>
  );
}

export default Register;
