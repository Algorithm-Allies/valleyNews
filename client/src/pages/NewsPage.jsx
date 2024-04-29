import { useEffect, useState, useRef } from "react";
import ArticleThumbnail from "../components/ArticleThumbnail";
import LatestArticle from "../components/LatestArticle";
import { useParams, Link } from "react-router-dom";

import {
  getArticlesByCategoryAndSubcategory,
  getArticlesByCategory,
} from "../services/articleService";
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage() {
  const articlesContainerRef = useRef(null);
  const { category, subcategory } = useParams();
  const [loading, setLoading] = useState(true);
  const [latestArticles, setLatestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let res;
        if (subcategory) {
          res = await getArticlesByCategoryAndSubcategory({
            category,
            subcategory,
            page: currentPage,
            perPage,
          });
        } else {
          res = await getArticlesByCategory({
            category,
            page: currentPage,
            perPage,
          });
        }
        if (res.ok) {
          setArticles(res.data.articles);
          setLatestArticles(res.data.articles.slice(0, 5));
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, subcategory, currentPage, perPage]);




  if (loading) {
    return (
      <div className="text-xl text-custom-orange flex justify-center mt-20">
        Loading...
      </div>
    );
  }
  return (
    <div
      ref={articlesContainerRef}
      className="flex justify-center flex-col items-center w-full my-20"
    >
      <LatestArticle articles={latestArticles} />
      <div className=" text-2xl leading-6 text-center text-custom-orange  m-4 items-stretch">
        {subcategory ? subcategory.toUpperCase() : null}
      </div>
      <div
        className="unset-border-box  shadow-gray-700 shadow-md bg-brown-400 
    p-8 rounded-lg grid xl:grid-cols-4 
    lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 
    md:gap-x-8 gap-4 md:w-[80vw] auto-rows-max"
      >
        {articles.map((article) => (
          <ArticleThumbnail
            key={article.id}
            id={article.id}
            article={article}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center mx-2">
            <div className="flex items-center mx-2">
  <input
    type="number"
    className="w-16 text-center border border-gray-300 rounded-md mr-2 focus:outline-none"
    value={currentPage}
    onChange={(e) => {
      const pageNumber = parseInt(e.target.value);
      if (
        !isNaN(pageNumber) &&
        pageNumber >= 1 &&
        pageNumber <= totalPages
      ) {
        setCurrentPage(pageNumber);
      }
    }}
  />
  <p className="text-sm text-stone-500">of {totalPages}</p>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
