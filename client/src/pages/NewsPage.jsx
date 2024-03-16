import ArticleThumbnail from "../components/ArticleThumbnail";
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage() {
  return (
    <div>
      NewsPage
      <div className="unset-border-box w-full shadow-gray-700 shadow-md bg-brown-400 p-8 rounded-lg flex flex-row gap-x-8 items-center justify-contents-center ">
        <ArticleThumbnail/>
        <ArticleThumbnail/>
        <ArticleThumbnail/>
      </div>
    </div>
  );
}

export default NewsPage;
