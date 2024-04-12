import React from "react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/16/solid";
import EditCommentModal from "./EditCommentModal";

export default function Comment({ comment }) {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <div className="space-y-4">
      <div className="bg-stone-200 h-[2px]"></div>
      <div className="bg-brown-200 space-y-2 text-stone-500 p-4 rounded-lg">
        <div className="flex justify-between items-start ">
          <div className="flex flex-col space-y-0.5">
            <h5 className="text-base font-semibold">johhdoe@gmail.com</h5>
            <time className="text-sm ">1 hr ago</time>
          </div>
          <div className="flex gap-3 translate-y-1">
            <button onClick={() => setIsEditing(true)}>
              <PencilSquareIcon className="size-4" />
            </button>
            <button>
              <XMarkIcon className="size-4" />
            </button>
          </div>
        </div>
        <p className="text-base">{comment}</p>
      </div>
      {isEditing && (
        <EditCommentModal comment={comment} closeModal={setIsEditing} />
      )}
    </div>
  );
}
