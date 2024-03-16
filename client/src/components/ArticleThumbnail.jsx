import TestImage from '../assets/test-image.png';
function ArticleThumbnail() {
  return (
   
    <div className="w-48 shadow-gray-700 shadow-md bg-brown-100 p-2 rounded-lg flex items-center justify-contents-center flex-col">
      <img className="object-cover h-48 w-96" src={TestImage}></img>
      <h1>Hello World</h1>
      Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s 
    </div>
  );
}

export default ArticleThumbnail;
