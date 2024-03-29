import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
function AuthLayout() {
  return (
    <div className="h-screen bg-brown-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center max-w-[80vw] w-full mx-auto pt-[15vh]">
        {/* <div className="space-y-2 text-center mb-4">
          <h1 className="text-3xl leading-6 font-bold text-custom-orange">
            Central Valley News
          </h1>
          <p className="text-sm text-brown-400">
            Get the latest news from around the Central Valley!
          </p>
        </div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
