import React from "react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/16/solid";
import EditCommentModal from "./EditCommentModal";
import { useUser } from "../hooks/useUserContext";
import axios from "axios";

export default function Comment({
  comment,
  time,
  commentUserId,
  commentId,
  onDeleteComment,
}) {
  const { userId } = useUser();
  const [isEditing, setIsEditing] = React.useState(false);

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}`
      );
      onDeleteComment(commentId);
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-stone-200 h-[2px]"></div>
      <div className="bg-brown-200 space-y-2 text-stone-500 p-4 rounded-lg">
        <div className="flex justify-between items-start ">
          <div className="flex flex-col space-y-0.5">
            <h5 className="text-base font-semibold">Anonymous</h5>
            <time className="text-sm ">{time}</time>
          </div>
          {userId === commentUserId && (
            <div className="flex gap-3 translate-y-1">
              {
                //<button onClick={() => setIsEditing(true)}>
                //<PencilSquareIcon className="size-4" />
                //</button>
              }
              <button onClick={() => deleteComment(commentId)}>
                {" "}
                <XMarkIcon className="size-4" />
              </button>
            </div>
          )}
        </div>
        <p className="text-base">{comment}</p>
      </div>
      {isEditing && (
        <EditCommentModal comment={comment} closeModal={setIsEditing} />
      )}
    </div>
  );
}
