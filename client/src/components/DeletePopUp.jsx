import React from "react";

function DeletePopup({ onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
            onClick={onDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
