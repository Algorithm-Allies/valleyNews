
import { Link } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";

function PageNotFound() {
  return (
    <div className="h-screen bg-brown-100">
      <div className="h-full flex flex-col justify-center max-w-lg w-full mx-auto">
        {/* <div className="space-y-2 text-center mb-4">
            <h1 className="text-3xl leading-6 font-bold text-custom-orange">
              Central Valley News
            </h1>
            <p className="text-sm text-brown-400">
              Get the latest news from around the Central Valley!
            </p>
        </div> */}
        <AuthForm>
          <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-brown-100 pb-6">404 Page not Found</h1>
            <Link to="/auth/reset" className="text-sm text-brown-100">
              Forgot your password? Click Here
            </Link>
            <Link to="/auth/login" className="text-sm text-brown-100">
              Already have an account? Click Here
            </Link>
          </div>
        </AuthForm>
      </div>
    </div>
  );
}

export default PageNotFound;