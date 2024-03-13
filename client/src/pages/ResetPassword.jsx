import React from "react";
import { Link, useRouteError } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthInput from "../components/Auth/AuthInput";


function ResetPassword() {
  const error = useRouteError();
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
      {error && <p>{error.data}</p>}
      <button className="block shadow-brown shadow-lg w-1/2 py-2 mx-auto mb-4 bg-brown-300 text-white rounded">
        Send Reset Link
      </button>
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

export default ResetPassword;