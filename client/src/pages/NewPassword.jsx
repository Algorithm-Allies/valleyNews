import { Link, useRouteError } from "react-router-dom";
import AuthError from "../components/Auth/AuthError";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";

export async function action({ request }) {
  const formData = await request.formData();
  const { password, confirmPassword } = Object.fromEntries(formData);
  if (password !== confirmPassword) {
    throw new Response("Passwords don't match!", { status: 400 });
  }
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/users/new-password`,
    {
      method: "POST",
      body: JSON.stringify({ password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // If, the user was succesful in logging in, we redirect them to home page
  if (res.ok) {
    return redirect("/");
  }
  // Otherwise, something went wrong on the server and we throw an error. This error will show up in useRouterError
  throw new Response("Username and password don't match!", { status: 400 });
}

function NewPassword() {
  const error = useRouteError();
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
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
        />
        <AuthInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          label="Confirm Password"
        />
      </div>
      {error && <AuthError error={error.data} />}
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
