import React from "react";
import { Link } from "react-router-dom";

// function NavBar() {
//   return (
//     <nav>
//       <ul className="flex *:text-gray-600 border-blue-300 justify-center pt-2">
//         <li className="py-2 border-r-2 border-gray-300">
//           <a href="#" className="hover:text-yellow-600">
//             Home
//           </a>
//         </li>
//         <li className="py-2  border-r-2 border-gray-300">
//           <a href="#" className=" hover:text-yellow-600">
//             Local
//           </a>
//         </li>
//         <li className="py-2 border-r-2 border-gray-300">
//           <a href="#" className="hover:text-yellow-600">
//             Sports
//           </a>
//         </li>
//         <li className="py-2 border-r-2 border-gray-300">
//           <a href="#" className="hover:text-yellow-600">
//             Crime
//           </a>
//         </li>
//         <li className="py-2 border-r-2 border-gray-300">
//           <a href="#" className="hover:text-yellow-600">
//             Subscribe
//           </a>
//         </li>
//         <li className="py-2 border-r-2 border-gray-300">
//           <a href="#" className="hover:text-yellow-600">
//             Staff
//           </a>
//         </li>
//         <li className="py-2">
//           <a
//             href="#"
//             className="text-yellow-600 font-medium hover:text-yellow-600"
//           >
//             Login
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

function NavBar() {
  return (
    <nav className="bg-stone-700 p-4">
      <div className="max-w-7xl mx-auto flex items-baseline">
        <Link className=" text-custom-orange text-xl font-bold" to="/">
          CVNews
        </Link>
        <ul className="ml-auto flex gap-6 text-gray-50">
          <li>
            <Link className="inline-block text-base p-2">News</Link>
          </li>
          <li>
            <Link className="inline-block text-base p-2">Sports</Link>
          </li>
          <li>
            <Link className="inline-block text-base p-2">Staff</Link>
          </li>
          <li>
            <button className="text-base border py-2 px-4 border-stone-400 rounded">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
