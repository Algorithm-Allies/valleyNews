import React from "react";
import { useState } from "react";
import { useUser } from "../hooks/useUserContext";
import axios from "axios";
import fetchWithAuth from "../lib/fetchWithAuth";

const MAX_CHARACTERS = 400;
export default function CommentForm({ articleId, addComment }) {
  const { userId } = useUser();
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth(`/comments/${articleId}/${userId}`, {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const commentData = response[0];
      const {
        id,
        comment: newComment,
        user_id,
        article_id,
        created_at,
        updated_at,
      } = commentData;

      // Add the new comment to the list of comments;
      addComment({
        id,
        comment: newComment,
        user_id,
        article_id,
        created_at,
        updated_at,
      });
      // Clear any previous errors
      setError(null);
      // Clear the comment form
      setComment("");
    } catch (error) {
      console.log(error);
      // Handle error
      setError("Error adding comment. Please try again later.");
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form className="space-y-4">
      <h3 className="text-xl font-semibold">Discussion</h3>
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
          value={comment}
        ></textarea>
        <p
          className={`absolute bottom-0 left-0 translate-y-4 text-xs ${
            comment.length > MAX_CHARACTERS ? "text-red-500" : "text-stone-600"
          }`}
        >
          {MAX_CHARACTERS - comment.length} characters remaining
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
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
