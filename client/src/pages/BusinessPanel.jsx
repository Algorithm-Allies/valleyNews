import React from "react";
import BusinessNavBar from "../components/BusinessNavBar";
import Trash from '../assets/trash-fill.png';
import Pencil from '../assets/pencil-square.png';
import NewsPaper from '../assets/newspaper.png';
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
      <table class="table-auto border-collapse border border-[#FCFCFC] bg-[#FCFCFC]">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>ENGAGEMENTS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
        {articleData.map((item, i) =>
          <tr key={i} className="even:bg-[#F2F2F2] odd:bg-[#FCFCFC]">
            <td className="border border-[#FCFCFC] ">{item.id}</td>
            <td className="border border-[#FCFCFC] ">{item.title}</td>
            <td className="border border-[#FCFCFC] ">{item.engagements}</td>
            <td className="border border-[#FCFCFC] flex flex-row justify-evenly">
              <button><img src={Trash}/></button>
              <button><img src={Pencil}/></button>
              <button><img src={NewsPaper}/></button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>

  </div>
</div>)
}
const articleData =[
  {
    id: 1,
    title: "Test Article",
    engagements: 100

  },
  {
    id: 2,
    title: "Test Article",
    engagements: 100
  },
  {
    id: 3,
    title: "Test Article",
    engagements: 100

  },
  {
    id: 4,
    title: "Test Article",
    engagements: 100
  }
]
export default BusinessPanel;
