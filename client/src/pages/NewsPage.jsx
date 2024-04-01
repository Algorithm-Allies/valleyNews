import ArticleThumbnail from "../components/ArticleThumbnail";
import LatestArticle from "../components/LatestArticle";
import testImage from '../assets/test-image.png';
import birdImage from '../assets/bird.jpg'
import userImage from '../assets/user.svg';
//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage(pageHeaders) {
  return (
    <div className="flex justify-center flex-col items-center">
        <div className="text-2xl leading-6 font-bold text-custom-orange self-start m-4 items-stretch">{pageHeaders.spotlight}</div>
          {LatestArticle(latestArticle)}
        <div className="text-2xl leading-6 font-bold text-custom-orange self-start m-4 items-stretch">{pageHeaders.main}</div>
          {ArticleThumbnail(articles)}
      </div>
  );
}

const latestArticle=[{
  articleImg:testImage,
  articleTitle:"Soccer Time!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/20/24"
},{
  articleImg:testImage,
  articleTitle:"Soccer Time!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/20/24"
},{
  articleImg:testImage,
  articleTitle:"Soccer Time!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/20/24"
}]
const articles = [{
  articleImg:testImage,
  articleTitle:"Soccer Time!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/20/24"

},{
  articleImg:birdImage,
  articleTitle: "Bird Watching Taking Over Modesto",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Jane Schmoe",
  articleDate:"3/20/24"

},{
  articleImg:testImage,
  articleTitle: "More Soccer Time! Fun in the Sun!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/21/24"

},{
  articleImg:birdImage,
  articleTitle:"Funny Birds take over Modesto",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Jane Schmoe",
  articleDate:"3/21/24"

},{
  articleImg:testImage,
  articleTitle:"Soccer Time!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/20/24"

},{
  articleImg:birdImage,
  articleTitle: "Bird Watching Taking Over Modesto",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Jane Schmoe",
  articleDate:"3/20/24"

},{
  articleImg:testImage,
  articleTitle: "More Soccer Time! Fun in the Sun!",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Joe Schmoe",
  articleDate:"3/21/24"

},{
  articleImg:birdImage,
  articleTitle:"Funny Birds take over Modesto",
  articleBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  authorImg:userImage,
  articleAuthor:"Jane Schmoe",
  articleDate:"3/21/24"

}]
export default NewsPage;
