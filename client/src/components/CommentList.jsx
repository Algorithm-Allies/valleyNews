import { useState, useEffect } from "react";
import { usePagination } from "../hooks/usePagination";
import Comment from "./Comment";

export default function CommentList({ comments, deleteComment }) {
  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleTimeString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/Los_Angeles",
    });
    return formattedDate;
  }

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            {comments ? (
              comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <ul className="divide-y divide-gray-300">
                  {comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      commentUserId={comment.user_id}
                      comment={comment.comment}
                      time={formatDate(comment.updated_at)}
                      commentId={comment.id}
                      onDeleteComment={deleteComment}
                    />
                  ))}
                </ul>
              )
            ) : (
              <p>Loading comments...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
