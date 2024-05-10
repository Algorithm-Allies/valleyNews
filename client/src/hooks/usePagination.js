import React from "react";

export function usePagination({ data, itemsPerPage }) {
  const countPerPage = React.useRef(itemsPerPage);
  const [currPage, setCurrPage] = React.useState(1);
  const hasPrev = currPage > 1;
  const hasNext = currPage * countPerPage.current < data.length;
  const currData = data.slice(
    (currPage - 1) * countPerPage.current,
    currPage * countPerPage.current
  );

  function nextPage() {
    if (hasNext) {
      setCurrPage(currPage + 1);
    }
  }
  function prevPage() {
    if (hasPrev) {
      setCurrPage(currPage - 1);
    }
  }
  return {
    currPageItems: currData,
    currPage,
    nextPage,
    prevPage,
    hasPrev,
    hasNext,
    countPerPage: countPerPage.current,
  };
}
