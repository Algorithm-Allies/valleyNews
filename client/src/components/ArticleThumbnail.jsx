import { Link } from "react-router-dom";
import NewsImage from "../assets/newspaper.jpg";
import { createArticleUrl } from "../lib/articleUrlHelper";
function ArticleThumbnail({ id, article }) {
  return (
    <>
      <Link
        to={`/${createArticleUrl({
          category: article.category,
          subcategory: article.subcategory,
          id,
        })}`}
      >
        <div className="shadow-gray-700 shadow-md bg-brown-100 p-3 rounded-lg flex md:justify-between flex-col h-full">
          <img
            className="object-cover h-48 w-100"
            src={[article.image_url ?? NewsImage]}
            alt={article.image_alt_description}
          ></img>
          <div className="text-lg py-1.5 font-bold line-clamp-2">
            {article.headline}
          </div>
          <div className="py-1.5"></div>
          <div className="flex items-end justify-end">
            <div className="text-sm flex items-stretch flex-col">
              <p className="text-gray-900 leading-none">
                {article.author} {article.publisher && `@${article.publisher}`}
              </p>
              <p className="text-gray-600">{article.date_published}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ArticleThumbnail;
