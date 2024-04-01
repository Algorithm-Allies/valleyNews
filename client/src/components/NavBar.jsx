import React from "react";

function NavBar() {
  return (
    <nav>
      <ul className="flex *:text-gray-600 border-blue-300 justify-center pt-2">
        <li className="py-2 border-r-2 border-gray-300">
          <a href="#" className="hover:text-yellow-600">
            Home
          </a>
        </li>
        <li className="py-2  border-r-2 border-gray-300">
          <a href="#" className=" hover:text-yellow-600">
            Local
          </a>
        </li>
        <li className="py-2 border-r-2 border-gray-300">
          <a href="#" className="hover:text-yellow-600">
            Sports
          </a>
        </li>
        <li className="py-2 border-r-2 border-gray-300">
          <a href="#" className="hover:text-yellow-600">
            Crime
          </a>
        </li>
        <li className="py-2 border-r-2 border-gray-300">
          <a href="#" className="hover:text-yellow-600">
            Subscribe
          </a>
        </li>
        <li className="py-2 border-r-2 border-gray-300">
          <a href="#" className="hover:text-yellow-600">
            Staff
          </a>
        </li>
        <li className="py-2">
          <a
            href="#"
            className="text-yellow-600 font-medium hover:text-yellow-600"
          >
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
