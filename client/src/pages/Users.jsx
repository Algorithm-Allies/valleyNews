import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUserContext";
import BusinessNavBar from "../components/BusinessNavBar";
import Trash from "../assets/trash-fill.png";
import Pencil from "../assets/pencil-square.png";
import NewsPaper from "../assets/newspaper.png";
import { getUsersByBusinessId } from "../services/userService";

function Users() {
  const { businessId } = useUser();

  const [businessUsers, setBusinessUsers] = React.useState([]);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!businessId) {
      navigate("/news");
    }
  }, [businessId]);

  React.useEffect(() => {
    const getUsers = async () => {
      const users = await getUsersByBusinessId(businessId);

      setBusinessUsers(users);
    };
    getUsers();
  }, []);

  // Deletes User from Business, needs businessId and UserId in body.
  const deleteUserFromBusiness = async (userId, businessId) => {
    fetch(`https://valleynews-dev.onrender.com/api/business/user/remove/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, businessId }),
    });

    setBusinessUsers((prev) => prev.filter((current) => current.id != userId));
  };

  return (
    <div className="h-screen bg-brown-100">
      <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
        <div className="flex flex-col w-100 pt-[10vh]">
          <div className="flex flex-row justify-between pb-4">
            <h1 className="text-4xl text-black-100 m-0">Users</h1>
            <Link
              to="/adduser"
              className="w-1/4 py-2 mr-8 rounded bg-orange-400 text-white m-0 flex justify-center items-center"
            >
              Add User
            </Link>
          </div>

          <hr className="rounded-md border-y-8 border-brown-400 mb-5" />
          <div className="flex justify-center">
            <table className="table-auto w-[70vw] border-collapse border border-[#FCFCFC] bg-[#FCFCFC]">
              <thead>
                <tr className="text-left py-3">
                  <th>ID</th>

                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {businessUsers.map((user, i) => (
                  <tr
                    key={i}
                    className="even:bg-[#F2F2F2] odd:bg-[#FCFCFC] border border-[#FCFCFC] py-4"
                  >
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td className="flex flex-row justify-around">
                      <button
                        onClick={() =>
                          deleteUserFromBusiness(user.id, businessId)
                        }
                      >
                        <img className="w-5" src={Trash} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row pb-10 justify-end"></div>
        </div>
      </div>
    </div>
  );
}

export default Users;
