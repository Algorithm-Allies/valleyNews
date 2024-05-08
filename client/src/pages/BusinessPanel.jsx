import React, { useState, useEffect } from "react";
import BusinessNavBar from "../components/BusinessNavBar";
import Trash from "../assets/trash-fill.png";
import Pencil from "../assets/pencil-square.png";

import {
  deleteArticle,
  getArticlesByBusiness,
} from "../services/articleService";
import { useUser } from "../hooks/useUserContext";
import { Link } from "react-router-dom";
import { createArticleUrl } from "../lib/articleUrlHelpers";
import DeletePopup from "../components/DeletePopUp";
function BusinessPanel() {
  const [articleData, setArticleData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
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
      console.log(response.data);
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
    <div className="h-screen bg-brown-100">
      <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
        <BusinessNavBar />
        <div className="flex flex-col w-100 pt-[10vh]">
          <div className="flex flex-row justify-between pb-4">
            <h1 className="text-4xl text-black-100 m-0">Articles</h1>
            <button className="w-1/4 py-2 mr-8 rounded bg-orange-400 text-white m-0">
              <a href="/createarticle">New Article</a>
            </button>
          </div>
          <hr className="rounded-md border-y-8 border-brown-400 mb-5 " />
          <div className="flex justify-center">
            <table className="table-auto w-[70vw] border-collapse border border-[#FCFCFC] bg-[#FCFCFC]">
              <thead>
                <tr className="text-left py-3">
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>ENGAGEMENTS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {articleData.map((item, i) => (
                  <tr
                    key={i}
                    className="even:bg-[#F2F2F2] odd:bg-[#FCFCFC] border border-[#FCFCFC] py-4"
                  >
                    <td>{item.id}</td>
                    <td className="flex-grow">
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
                    <td>{item.click_count}</td>
                    <td className="flex flex-row justify-around">
                      <button onClick={() => handleDelete(item.id)}>
                        <img className="w-5" src={Trash} />
                      </button>
                      <button onClick={handleEdit}>
                        <img className="w-5" src={Pencil} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
