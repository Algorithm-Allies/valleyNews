import { useState, useEffect } from "react";
import { usePagination } from "../hooks/usePagination";
import Comment from "./Comment";

export default function CommentList({ comments, deleteComment }) {
  const { data, nextPage, prevPage, currPage, countPerPage, hasNext, hasPrev } =
    usePagination({
      initialData: [],
      itemsPerPage: 5,
    });

  useEffect(() => {
    console.log("comments", comments);
  }, [comments]);

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
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-stone-500">
            Showing {(currPage - 1) * countPerPage + 1} to out of comments
          </p>
          <div className="flex gap-4 text-stone-800">
            <button
              disabled={!hasPrev}
              onClick={() => {
                prevPage();
              }}
              className="py-2 px-6 bg-zinc-300 items-center rounded-lg disabled:bg-zinc-200"
            >
              Prev
            </button>
            <button
              disabled={!hasNext}
              onClick={() => {
                nextPage();
              }}
              className="py-2 px-6 bg-zinc-300 items-center rounded-lg disabled:bg-stone-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
