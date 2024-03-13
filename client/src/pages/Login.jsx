import { Form, Link, redirect, useRouteError } from "react-router-dom";

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
  // If, the user was succesful in loggin in, we redirect them to home page
  if (res.ok) {
    return redirect("/");
  }
  // Otherwise, something went wrong on the server and we throw an error
  throw new Response("Username and password don't match!", { status: 400 });
}

function Login() {
  const error = useRouteError();
  return (
    <Form method="post" className="w-full bg-brown-400 p-8 rounded-lg">
      <p className="text-white text-xl text-center mb-4">
        Login to your Account
      </p>
      <div className="flex flex-col gap-4 mb-6">
        <label>
          <span className="sr-only">Email</span>
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className=" w-full p-2 rounded"
          />
        </label>
        <label>
          <span className="sr-only">Password</span>
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
            className=" w-full p-2 rounded"
          />
        </label>
      </div>
      {error && <p>{error.data}</p>}
      <button className="block w-1/2 py-2 mx-auto mb-4 bg-brown-300 text-white rounded hover:bg-brown-300/90">
        Login
      </button>
      <div className="flex flex-col items-center gap-2">
        <Link className="text-sm text-brown-100">
          Forgot your password? Click Here
        </Link>
        <Link to="/register" className="text-sm text-brown-100">
          Need an account? Click Here
        </Link>
      </div>
    </Form>
  );
}

export default Login;
