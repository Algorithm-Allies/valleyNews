import { usePagination } from "../hooks/usePagination";
import Comment from "./Comment";

// just for testing purposes, will we get the actual comments from the database
const TEST_COMMENTS = new Array(20).fill(null).map((_, idx) => {
  return {
    id: idx,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum reiciendisiusto nostrum accusantium excepturi praesentium eligendi soluta fuga?Veniam nihil quia temporibus sapiente odio dolor animi teneturconsequuntur eius provident!",
  };
});

export default function CommentList() {
  const { data, nextPage, prevPage, currPage, countPerPage, hasNext, hasPrev } =
    usePagination({
      initialData: TEST_COMMENTS,
      itemsPerPage: 5,
    });
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {data.map(({ id, comment }) => {
          return <Comment key={id} comment={comment} />;
        })}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-stone-500">
          Showing {(currPage - 1) * countPerPage + 1} to{" "}
          {Math.min(currPage * countPerPage, TEST_COMMENTS.length)} out of{" "}
          {TEST_COMMENTS.length} comments
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
  );
}
