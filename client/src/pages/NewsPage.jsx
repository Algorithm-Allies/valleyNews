import ArticleThumbnail from "../components/ArticleThumbnail";
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage() {
  return (
    <div className="flex justify-center flex-col items-center max-w-[50vw]">
      <div className="align-start">News Page</div>
      <div className="unset-border-box w-full shadow-gray-700 shadow-md bg-brown-400 p-8 rounded-lg flex flex-row gap-x-8 items-center justify-contents-center w-[50vw]">
        <ArticleThumbnail/>
        <ArticleThumbnail/>
        <ArticleThumbnail/>
      </div>
    </div>
  );
}

export default NewsPage;
