import ArticleThumbnail from "../components/ArticleThumbnail";
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage() {
  return (
    <div className="flex justify-center flex-col items-center max-md:max-w-[50vw]">
      <div className="text-2xl leading-6 font-bold text-custom-orange self-start m-4">News Page</div>
      <div className="max-md:w-max-3xl unset-border-box md:w-full shadow-gray-700 shadow-md bg-brown-400 p-8 rounded-lg flex flex-row max-md:flex-col md:gap-x-8 gap-4 items-center md:justify-center md:w-[80vw]">
        <ArticleThumbnail/>
        <ArticleThumbnail/>
        <ArticleThumbnail/>
        <ArticleThumbnail/>
      </div>
    </div>
  );
}

export default NewsPage;
