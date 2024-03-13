import { Link, redirect, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";
import AuthError from "../components/Auth/AuthError";

export async function action({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // If, the user was succesful in logging in, we redirect them to home page
  if (res.ok) {
    return redirect("/");
  }
  // Otherwise, something went wrong on the server and we throw an error. This error will show up in useRouterError
  throw new Response("Username and password don't match!", { status: 400 });
}

function Login() {
  const error = useRouteError();

  return (
    <AuthForm>
      <h2 className="text-white text-xl text-center mb-4">
        Login to your Account
      </h2>
      <div className="flex flex-col gap-4">
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
      </div>
      {error && <AuthError error={error.data} />}
      <button className="block w-1/2 py-2 mx-auto mt-6 bg-brown-300 text-white rounded">
        Login
      </button>
      <div className="flex flex-col items-center gap-2 mt-4">
        <Link className="text-sm text-brown-100">
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
