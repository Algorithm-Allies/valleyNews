import TestImage from '../assets/test-image.png';
import UserIcon from '../assets/user.svg'
function ArticleThumbnail() {
  return (
    <div className=" w-[80vw] shadow-gray-700 shadow-md bg-brown-100 p-3 rounded-lg flex md:justify-contents-center flex-col">
      <img className="object-cover h-48 w-96" src={TestImage}></img>
      <div className='text-lg py-1.5 font-bold'>Hello World</div>
      <div className='py-1.5'>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s</div>
      <div className="flex items-center">
      <img className="w-10 h-10 rounded-full mr-4" src={UserIcon} alt="User"/>
      <div className="text-sm flex items-start flex-col">
        <p className="text-gray-900 leading-none">Joe Schmoe</p>
        <p className="text-gray-600">Aug 18</p>
      </div>
      </div>
    </div>
  );
}

export default ArticleThumbnail;
