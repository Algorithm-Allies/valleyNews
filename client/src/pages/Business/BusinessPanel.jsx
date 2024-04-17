import React from "react";

function BusinessPanel({dataType}) {
  const tableHeaders = {
    articles: {
      id: 'ID',
      title: 'Title',
      engagements: 'Engagements'
    },
    users: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email'
    }
  }
  const headers = Object.keys(tableHeaders[dataType])
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
  const usersDummyData = [
    {
      name: 'john',
      phone: 5555555555,
      email: 'john@email.com'
    },
    {
      name: 'suzy',
      phone: 1111111111,
      email: 'suzy@email.com'
    }
  ]
  const data = dataType == 'articles' ? articleDummyData : usersDummyData
  return <div>
    <div className="flex items-center">
      <h2 className="text-2xl font-bold">{dataType === 'articles' ? 'Articles' : 'Users'}</h2>
      {dataType === 'articles' && <button className="ml-auto bg-orange-500 text-white py-2 px-4 rounded-md">New Article</button>}
    </div>
    <hr className="h-2 bg-black mt-2" />
    <table className="text-left bg-white">
      <tr>
        {headers.map(header=>(
          <th className="p-4">{tableHeaders[dataType][header]}</th>
        ))}
        <th className="p-4">Actions</th>
      </tr>
      {
        data.map((item) => {
          return (
            <tr className="">
              {
                headers.map(header=>(
                  <td className="p-4">{item[header]}</td>
                ))
              }
              <td className="p-4">
                <button><i class="fa-solid fa-trash"></i></button>
                <button><i class="fa-solid fa-pencil mx-4"></i></button>
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
