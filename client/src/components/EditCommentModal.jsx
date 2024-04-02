import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
export default function EditCommentModal({ comment, closeModal }) {
  const [editComment, setEditComment] = React.useState(comment);
  const MAX_CHARACTERS = 400;
  return (
    <Dialog.Root
      onOpenChange={() => {
        closeModal();
      }}
      defaultOpen
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0" />
        <Dialog.Content asChild>
          <form className="fixed  inset-0 space-y-4 bg-white p-4 max-h-[85vh] h-fit  w-[90vw] max-w-[450px] m-auto rounded-lg shadow-xl">
            <h2 className="text-gray-700 text-lg font-bold">Edit Comment</h2>
            <div className="space-y-0.5">
              <textarea
                onChange={(e) => {
                  setEditComment(e.target.value);
                }}
                name="comment"
                aria-label="comment"
                rows={6}
                defaultValue={comment}
                className="p-2.5 w-full text-sm  bg-brown-200 rounded-lg placeholder-stone-500"
                placeholder="Write your thoughts here..."
              ></textarea>
              <p
                className={`text-xs leading-none ${
                  editComment.length > MAX_CHARACTERS
                    ? "text-red-500"
                    : "text-stone-600"
                }`}
              >
                {MAX_CHARACTERS - editComment.length} characters remaining
              </p>
            </div>
            <div className="flex justify-center">
              <button
                disabled={editComment.length > MAX_CHARACTERS}
                className={`${
                  editComment.length > MAX_CHARACTERS
                    ? "bg-custom-orange/70"
                    : "bg-custom-orange"
                } px-6 py-2 text-gray-100 rounded-lg w-2/3`}
              >
                Post
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
