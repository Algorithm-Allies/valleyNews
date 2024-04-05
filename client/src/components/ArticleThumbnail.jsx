import { Link } from "react-router-dom";

function ArticleThumbnail({
  id,
  category,
  subcategory,
  url,
  author,
  publisher,
  title,
  imgUrl,
  imgDescription,
  date,
  thumbnail,
  body,
}) {
  return (
    <>
      <Link to={`/${category}/${subcategory}/${id}`}>
        <div className="shadow-gray-700 shadow-md bg-brown-100 p-3 rounded-lg flex md:justify-between flex-col h-full">
          <img className="object-cover h-48 w-100" src={[imgUrl]}></img>
          <div className="text-lg py-1.5 font-bold line-clamp-2">{title}</div>
          <div className="py-1.5"></div>
          <div className="flex items-end justify-end">
            <div className="text-sm flex items-stretch flex-col">
              <p className="text-gray-900 leading-none">
                {author} {publisher && `@${publisher}`}
              </p>
              <p className="text-gray-600">{date}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ArticleThumbnail;
