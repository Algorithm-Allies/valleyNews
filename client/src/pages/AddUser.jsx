import React, { useState, useRef, useEffect } from "react";
import { addBusinessUser } from "../services/userService.js";

import { useUser } from "../hooks/useUserContext.js";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate()
  const initialFormData = {
    userId: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { businessId } = useUser();

  useEffect(() => {
    if (!businessId) {
      navigate("/news");
    }
  }, [businessId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addBusinessUser({
        ...formData,
        businessId,
      });

      setSuccess("User added successfully");
      setError(""); // Clear error
    } catch (error) {
      console.error("Error adding user:", error);
      setError(error.message);
      setSuccess(""); // Clear success message in case of error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Reset form data to initial values
    setError("");
    setSuccess("Cleared");
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input field
    }
  };

  return (
    <div className="bg-brown-100">
      <div className="h-[100vh] flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
        <div className="flex flex-col w-100">
          <h1 className="text-4xl text-black-100 flex pt-20">
            Add User to Business
          </h1>
          <hr className="rounded-md border-r-[60vw] border-y-8 border-brown-400 mb-10 " />
          <form className="flex flex-col w-100" onSubmit={handleSubmit}>
            <label>User ID</label>
            <input
              value={formData.userId}
              onChange={handleChange}
              name="userId"
              placeholder="Enter User ID ..."
              className="mb-4"
            />

            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-custom-orange">{error}</p>}
            <div className="flex flex-row pb-10">
              <button
                type="submit"
                className="w-1/4 py-2 mr-8 mt-6  rounded bg-yellow-600/50 "
              >
                Add new User
              </button>
              <button
                type="reset"
                onClick={handleCancel}
                className="w-1/4 py-2 mr-8 mt-6  rounded bg-brown-400"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
