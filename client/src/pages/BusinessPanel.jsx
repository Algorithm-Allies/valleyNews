import React, { useState, useEffect } from "react";
import BusinessNavBar from "../components/BusinessNavBar";

import {
  deleteArticle,
  getArticlesByBusiness,
} from "../services/articleService";
import { useUser } from "../hooks/useUserContext";
import { Link } from "react-router-dom";
import { createArticleUrl } from "../lib/articleUrlHelpers";
import DeletePopup from "../components/DeletePopUp";
import { TrashIcon } from "@heroicons/react/16/solid";
import { usePagination } from "../hooks/usePagination";

function BusinessPanel() {
  const [articleData, setArticleData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const {
    currPageItems,
    nextPage,
    prevPage,
    currPage,
    countPerPage,
    hasNext,
    hasPrev,
  } = usePagination({
    data: articleData,
    itemsPerPage: 10,
  });
  const userInfo = useUser();

  useEffect(() => {
    getArticlesByBusiness(userInfo.businessId)
      .then((data) => setArticleData(data))
      .catch((error) => console.log("Error fetching articles", error));
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("edit");
  };

  const handleDelete = (articleId) => {
    setSelectedArticleId(articleId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Deleting article with ID:", selectedArticleId);
      const response = await deleteArticle(selectedArticleId);
      console.log(response);
      setShowDeletePopup(false);
      setArticleData(
        articleData.filter((item) => item.id !== selectedArticleId)
      );
    } catch (error) {
      console.error("Error confirming article deletion:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="min-h-screen bg-brown-100">
      <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto pb-12">
        <div className="flex flex-col w-100 pt-[10vh]">
          <div className="flex flex-row justify-between pb-4">
            <h1 className="text-4xl text-black-100 m-0">Articles</h1>
            <Link
              to="/createarticle"
              className="w-1/4 py-2 mr-8 rounded bg-orange-400 text-white m-0 flex justify-center items-center"
            >
              New Article
            </Link>
          </div>
          <hr className="rounded-md border-y-8 border-brown-400 mb-5 " />
          <div className="flex justify-center">
            <table className="table-auto w-[70vw] border-collapse  bg-[#FCFCFC] sh">
              <thead>
                <tr className="flex border-b-2 border-gray-300">
                  <th className="text-left px-6 py-3 w-28">ID</th>
                  <th className="text-left px-6 py-3 flex-1">TITLE</th>
                  <th className="text-left px-6 py-3 w-40">ENGAGEMENTS</th>
                  <th className="text-center px-6 py-3 w-40">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currPageItems.map((item, i) => (
                  <tr
                    key={i}
                    className="flex w-full even:bg-[#F2F2F2] odd:bg-[#FCFCFC] "
                  >
                    <td className="w-28 px-6 py-2">{item.id}</td>
                    <td className="flex-1 w-full px-6 py-2">
                      <Link
                        className="underline"
                        to={`/${createArticleUrl({
                          category: item.category,
                          subcategory: item.subcategory,
                          id: item.id,
                        })}`}
                      >
                        {item.headline}
                      </Link>
                    </td>
                    <td className="w-40 px-6 py-2 text-center">
                      {item.click_count ?? 0}
                    </td>
                    <td className="flex w-40 justify-center items-center  py-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="translate-y-1"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-sm text-stone-500">
              Showing {(currPage - 1) * countPerPage + 1} to{" "}
              {Math.min(currPage * countPerPage, articleData.length)} out of{" "}
              {articleData.length} articles
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
                className="py-2 px-6 bg-zinc-300 items-center rounded-lg disabled:bg-zinc-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <DeletePopup
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default BusinessPanel;
