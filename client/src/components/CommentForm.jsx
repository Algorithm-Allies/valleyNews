import React from "react";

const MAX_CHARACTERS = 400;
export default function CommentForm() {
  const [comment, setComment] = React.useState("");
  return (
    <form className="space-y-4">
      <h3 className="text-xl font-semibold">Discussion (20)</h3>
      <div className="relative">
        <textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
          name="comment"
          aria-label="comment"
          rows={6}
          className="p-2.5 w-full text-sm  bg-brown-200 rounded-lg placeholder-stone-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <p
          className={`absolute bottom-0 left-0 translate-y-4 text-xs ${
            comment.length > MAX_CHARACTERS ? "text-red-500" : "text-stone-600"
          }`}
        >
          {Math.max(MAX_CHARACTERS - comment.length, 0)} characters remaining
        </p>
      </div>
      <div className="flex justify-end">
        <button
          disabled={comment.length > MAX_CHARACTERS}
          className={`${
            comment.length > MAX_CHARACTERS
              ? "bg-custom-orange/70"
              : "bg-custom-orange"
          } px-6 py-2 text-gray-100 rounded-lg `}
        >
          Post
        </button>
      </div>
    </form>
  );
}
