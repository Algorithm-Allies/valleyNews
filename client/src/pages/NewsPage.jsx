import ArticleThumbnail from "../components/ArticleThumbnail";
import testImage from '../assets/test-image.png';
import birdImage from '../assets/bird.jpg'
import userImage from '../assets/user.svg';
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-2xl leading-6 font-bold text-custom-orange self-start m-4">News Page</div>
        {ArticleThumbnail(articles)}
    </div>
  );
}
const articles = [{
  articleImg:testImage,
  articleBody: "Test body",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/20/24"

},{
  articleImg:birdImage,
  articleBody: "Test body 2",
  authorImg:userImage,
  articleAuthor:"Jane Schmoe",
  articleDate:"3/20/24"

}]
export default NewsPage;
