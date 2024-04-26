import React, { useState, useRef } from 'react';
import { createBusinessArticle } from '../services/articleBusinessService.js';
import BusinessNavBar from '../components/BusinessNavBar';

export default function CreateArticle() {
  const [formData, setFormData] = useState([{
    "source": "",
    "publisher": "",
    "heading": "",
    "subHeading": "",
    "category": "",
    "subcategory": "",
    "author": "",
    "date": "",
    "datetime":"",
    "img": {
      "src": null,
      "alt": ""
    },
    "thumbnail": {
      "src": "",
      "alt": ""
    },
    "paragraphs": [
      ""
    ],
    "business_id": null
  }]);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBusinessArticle(formData);
      console.log('Article created successfully:', response);
      setSuccess('Article created successfully');
      setError(''); // Clear error
    } catch (error) {
      console.error('Error creating article:', error);
      setError(error.message);
      setSuccess(''); // Clear success message in case of error
    }
  };

  const handleChange = (e, index, paragraphIndex) => {
    const { name, value } = e.target;
    const updatedFormData = formData.map((item, i) => {
      if (i === index) {
        if (name === "paragraphs") {
          const updatedParagraphs = [...item.paragraphs];
          updatedParagraphs[paragraphIndex] = value;
          return { ...item, paragraphs: updatedParagraphs };
        } else {
          return { ...item, [name]: value };
        }
      }
      return item;
    });
    setFormData(updatedFormData);
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Reset form data to initial values
    setError('');
    setSuccess('Cleared');
    // Reset file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input field
    }
  };

  return (
    <div className="bg-brown-100">
      <div className="h-full flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
        <BusinessNavBar />
        <div className="flex flex-col w-100">
          <h1 className="text-4xl text-black-100 flex pt-20">New Article</h1>
          <hr className="rounded-md border-r-[60vw] border-y-8 border-brown-400 mb-10 " />
          <form className="flex flex-col w-100" onSubmit={handleSubmit}>
            <label>New article heading</label>
            <input value={formData[0].heading} onChange={(e) => handleChange(e, 0)} name="heading" placeholder="Enter article heading ..." className="mb-4" />
            <label>New article sub heading</label>
            <input value={formData[0].subHeading} onChange={(e) => handleChange(e, 0)} name="subHeading" placeholder="Enter article sub heading ..." className="mb-4" />
            <label>New article body</label>
            <textarea value={formData[0].paragraphs[0]} onChange={(e) => handleChange(e, 0, 0)} name="paragraphs" rows={10} cols={40} placeholder="Enter article body ..." className="mb-8" />
            <div className='flex flex-row'>
              <select value={formData[0].author} onChange={(e) => handleChange(e, 0)} name="author" className="border-y-8 w-[20vw]">
                <option value="author1">author1</option>
                <option value="author2">author2</option>
              </select>
              <select value={formData[0].category} onChange={(e) => handleChange(e, 0)} name="category" className="border-y-8 w-[20vw]">
              <optgroup value="NEWS" label="NEWS">
                  <option value="LOCAL">LOCAL</option>
                  <option value="CRIME">CRIME</option>
                  <option value="GOVERNMENT">GOVERNMENT</option>
                  <option value="EDUCATION">EDUCATION</option>
                </optgroup>
                <optgroup value="SPORTS" label="SPORTS">
                  <option value="LOCAL">LOCAL</option>
                  <option value="HIGH SCHOOL">HIGH SCHOOL</option>
                </optgroup>
              </select>
            </div>
            <label className="mt-4">Upload Article Image</label>
            <input ref={fileInputRef} className="mt-4" type="file" id="image" name="filename" />
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-custom-orange">{error}</p>}
            <div className="flex flex-row pb-10">
              <button type="submit" className="w-1/4 py-2 mr-8 mt-6  rounded bg-yellow-600/50 ">Save</button>
              <button type="reset" onClick={handleCancel} className="w-1/4 py-2 mr-8 mt-6  rounded bg-brown-400">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}