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
  const [currentPage, setCurrentPage] = useState(null);
  const [temporaryPageNumber, setTemporaryPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    const savedPageNumber = localStorage.getItem('paginationPageNumber')
    if (savedPageNumber) {
      setCurrentPage(parseInt(savedPageNumber))
      setTemporaryPageNumber(parseInt(savedPageNumber))
    } else {
      setCurrentPage(1)
      setTemporaryPageNumber(1)
    }

  }, [])

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
          localStorage.setItem('paginationPageNumber', currentPage)
          setArticles(res.data.articles);
          setLatestArticles(res.data.articles.slice(0, 5));
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (currentPage) {
      fetchArticles();
      setTemporaryPageNumber(currentPage)
    }

  }, [category, subcategory, currentPage, perPage]);


  //Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoToPage = (e) => {
    if (temporaryPageNumber >= 1 && temporaryPageNumber <= totalPages) {
      setCurrentPage(temporaryPageNumber)
    }
  }

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
          <button
            className="py-2 px-6 bg-zinc-300 items-center rounded-lg disabled:bg-stone-200"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="mx-4 flex items-center">
            <p className="text-sm text-stone-500">
              Page <input type="number" className="border border-black w-10 text-center" value={temporaryPageNumber} onChange={(e) => setTemporaryPageNumber(parseInt(e.target.value))} /> of {totalPages}
            </p>
            <button onClick={handleGoToPage} className="border border-black ml-2 px-2">Go</button>
          </div>

          <button
            className="py-2 px-6 bg-zinc-300 items-center rounded-lg disabled:bg-stone-200"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
