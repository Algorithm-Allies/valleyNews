import React from "react";

function BusinessPanel() {
  const articleDummyData = [
    {
      id: 'al234oja3',
      title: 'Top Gaming Mouses',
      engagements: 4230
    }, {
      id: 'lb2k3540i',
      title: 'Get Rich Quick',
      engagements: 89402
    }, {
      id: 'd0yqfhsa8',
      title: 'Politics in Movies, Books, and More',
      engagements: 4230
    }, {
      id: 'j4098fdbj',
      title: 'What is really in your bread?',
      engagements: 2561
    }, {
      id: 'coip7808d',
      title: 'Celebrity Scandals (4/1/23)',
      engagements: 489711
    }
  ]
  return <div>
    <div className="flex items-center">
      <h2 className="text-xl font-bold">Articles</h2>
      <button className="ml-auto bg-orange-500 text-white py-2 px-4 rounded-md">New Article</button>
    </div>
    <hr className="h-2 bg-black mt-2" />
    <table className="text-left">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Engagements</th>
        <th>Actions</th>
      </tr>
      {
        articleDummyData.map((article) => {
          return (
            <tr className="">
              <td className="py-2">{article.id}</td>
              <td>{article.title}</td>
              <td>{article.engagements}</td>
              <td>
                <button><i class="fa-solid fa-trash"></i></button>
                <button><i class="fa-solid fa-pencil"></i></button>
                <button><i class="fa-solid fa-newspaper"></i></button>
              </td>
            </tr>
          )
        })
      }
    </table>

  </div>;
}

export default BusinessPanel;
