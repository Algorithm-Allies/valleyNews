import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React component
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { createArticleUrl } from "../lib/articleUrlHelper";
import NewsImage from "../assets/newspaper.jpg";
function LatestArticle({ articles }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      className="w-[40vw] unset-border-box  shadow-gray-700 shadow-md rounded-lg bg-black mb-8"
      slidesPerView={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      speed={1000}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {articles.map((article) => (
        <SwiperSlide
          className="shadow-gray-700 shadow-md bg-brown-100 p-3 rounded-lg flex-col justify-center items-center w-[50%]"
          key={article.id}
        >
          <a
            href={`/${createArticleUrl({
              category: article.category,
              subcategory: article.subcategory,
              id: article.id,
            })}`}
            className="cursor-pointer"
          >
            <img
              className="max-w-[20vw] object-cover m-8"
              src={article.image_url ?? NewsImage}
              alt={`Slide ${article.id}`}
            />
          </a>
          <div className="flex flex-col px-[2em] justify-center">
            <a
              href={`/${createArticleUrl({
                category: article.category,
                subcategory: article.subcategory,
                id: article.id,
              })}`}
              className="text-lg py-1.5 font-bold flex self-center cursor-pointer"
            >
              {article.headline}
            </a>
            <div className="flex items-end justify-end">
              <div className="text-sm flex items-stretch flex-col">
                <p className="text-gray-900 leading-none">{article.author}</p>
                <p className="text-gray-600">{article.date_published}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LatestArticle;
