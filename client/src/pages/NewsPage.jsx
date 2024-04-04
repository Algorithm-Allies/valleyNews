import { useEffect, useState } from "react";
import ArticleThumbnail from "../components/ArticleThumbnail";
import LatestArticle from "../components/LatestArticle";

import {
  getAllArticles,
  getArticlesByCategory,
} from "../services/articleService";
import { useParams } from "react-router-dom";
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage(pageHeaders) {
  const category = useParams().category;
  const [loading, setLoading] = useState(true);
  const [latestArticle, setLatestArticle] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getArticlesByCategory({ category });
        if (res.ok) {
          setArticles(res.data);
          setLatestArticle([res.data[0]]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-2xl leading-6 font-bold text-custom-orange self-start m-4 items-stretch">
        {pageHeaders.spotlight}
      </div>
      {LatestArticle(latestArticle)}
      <div className="text-2xl leading-6 font-bold text-custom-orange self-start m-4 items-stretch">
        {pageHeaders.main}
      </div>
      <div
        className="unset-border-box  shadow-gray-700 shadow-md bg-brown-400 
    p-8 rounded-lg grid xl:grid-cols-4 
    lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 
    md:gap-x-8 gap-4 md:w-[80vw] auto-rows-max"
      >
        {articles.map((article) => (
          <ArticleThumbnail
            id={article.id}
            category={category}
            key={article.id}
            url={article.source}
            author={article.author}
            publisher={article.publisher}
            title={article.headline}
            imgUrl={article.image_url}
            imgDescription={article.image_alt_description}
            date={article.date}
            thumbnail={article.thumbnail_url}
            body={article.paragraphs}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
