import React from "react";
import BusinessNavBar from "../components/BusinessNavBar";
function BusinessPanel() {
  return  (<div className="h-screen bg-brown-100">
  <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
    <BusinessNavBar/>
    <div className="flex flex-col w-100">
      <div className="flex flex-row justify-between pb-4">
        <h1 className="text-4xl text-black-100 m-0">Articles</h1>
        <button className="w-1/4 py-2 mr-8 rounded bg-orange-400 text-white m-0">New Article</button>
      </div>

      <hr className="rounded-md border-y-8 border-brown-400 mb-10 "/>
      <form className="flex flex-col w-100 ">
            
          

      </form>
    </div>

  </div>
</div>)
}

export default BusinessPanel;
