import React from "react";
import BusinessNavBar from "../components/BusinessNavBar";
import Trash from "../assets/trash-fill.png";
import Pencil from "../assets/pencil-square.png";
import NewsPaper from "../assets/newspaper.png";

function Users() {
  return (
    <div className="h-screen bg-brown-100">
      <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
        <BusinessNavBar />
        <div className="flex flex-col w-100 pt-[10vh]">
          <div className="flex flex-row justify-between pb-4">
            <h1 className="text-4xl text-black-100 m-0">Users</h1>
            <button className="w-1/4 py-2 mr-8 rounded bg-orange-400 text-white m-0">
              <a href="/adduser">New User</a>
            </button>
          </div>

          <hr className="rounded-md border-y-8 border-brown-400 mb-5" />
          <div className="flex justify-center">
            <table className="table-auto w-[70vw] border-collapse border border-[#FCFCFC] bg-[#FCFCFC]">
              <thead>
                <tr className="text-left py-3">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, i) => (
                  <tr
                    key={i}
                    className="even:bg-[#F2F2F2] odd:bg-[#FCFCFC] border border-[#FCFCFC] py-4"
                  >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td className="flex flex-row justify-around">
                      <button>
                        <img className="w-5" src={Trash} alt="Delete" />
                      </button>
                      <button>
                        <img className="w-5" src={Pencil} alt="Edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row pb-10 justify-end">
            <button className="w-1/4 py-2 mr-8 mt-6  rounded bg-yellow-600/50 ">
              Save
            </button>
            <button className="w-1/4 py-2 mr-8 mt-6  rounded bg-brown-400">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    role: "editor",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1122334455",
    role: "member",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "+1555666777",
    role: "member",
  },
];

export default Users;
