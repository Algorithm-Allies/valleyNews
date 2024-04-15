
function PageNotFound() {
  return (
    <div className="h-screen bg-brown-100">
      <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
        <div className="flex flex-col w-100">
            <h1 className="text-4xl text-black-100 flex">New Article</h1>
            <hr className="rounded-md border-r-[60vw] border-y-8 border-brown-400 mb-10 "/>
            <form className="flex flex-col w-100 ">
                <label>New article heading</label>
                <input name="query" placeholder="Enter article heading ..." className="mb-4"/>
                <label>New article sub heading</label>
                <input name="query" placeholder="Enter article sub heading ..." className="mb-4"/>
                <label>New article body</label>
                <textarea id="story" name="story" rows={10} cols={40} placeholder="Enter article body ..." className="mb-8"/>
                <select name="author" className="border-y-8 w-[20vw]">
                    <option value="author1">author1</option>
                    <option value="author2">author2</option>
                </select>
                <div className="flex flex-row">
                    <button className="w-1/4 py-2 mr-8 mt-6  rounded bg-yellow-600/50 ">Save</button>
                    <button className="w-1/4 py-2 mr-8 mt-6  rounded bg-brown-400">Cancel</button>
                </div>
            </form>
        </div>

      </div>
    </div>
  );
}

export default PageNotFound;