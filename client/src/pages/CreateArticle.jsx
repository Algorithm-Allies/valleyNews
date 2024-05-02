import React, { useState, useRef } from 'react';
import { createBusinessArticle } from '../services/articleBusinessService.js';
import BusinessNavBar from '../components/BusinessNavBar';
import {useUser} from "../hooks/useUserContext";

export default function CreateArticle() {
  const now = new Date();
  const dateString = now.toLocaleDateString('en-GB'); //dd/MM/yyyy
  const {business_id} = useUser();
  console.log("UserInfo's Business ID from useUser:", {business_id});
  const [formData, setFormData] = useState([{
    "source": "source1",
    "publisher": "publisher1",
    "heading": "",
    "subHeading": "",
    "category": "",
    "subcategory": "",
    "author": "author1",
    "date": dateString,
    "datetime": now,
    "img": {
      "src": "https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg",
      "alt": "image"
    },
    "thumbnail": {
      "src": "https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg",
      "alt": "thumbnail"
    },
    "paragraphs": [
      ""
    ],
    "business_id": business_id,
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
  /*handles Category and Subcategories */
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleCategoryChange = (e) => {
    const updatedCategory = e.target.value;
    const updatedFormData = formData.map((item, index) => {
      if (index === 0) { 
        return { ...item, category: updatedCategory, subcategory: '' }; // Reset subcategory
      }
      return item;
    });
    setFormData(updatedFormData);
    setSelectedCategory(updatedCategory);
    setSelectedSubCategory('');
  };
  
  const handleSubCategoryChange = (e) => {
    const updatedSubCategory = e.target.value;
    const updatedFormData = formData.map((item, index) => {
      if (index === 0) {
        return { ...item, subcategory: updatedSubCategory };
      }
      return item;
    });
    setFormData(updatedFormData);
    setSelectedSubCategory(updatedSubCategory);
  };
  const categories = {
    NEWS: ["LOCAL NEWS", "CRIME", "GOVERNMENT", "EDUCATION"],
    SPORTS: ["LOCAL SPORTS", "HIGH SCHOOL SPORTS"]
  };

  return (
    <div className="bg-brown-100 pb-[5vh]">
      <div className="flex flex-col pt-8 max-w-[70vw] w-full mx-auto">
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
            <textarea value={formData[0].paragraphs} onChange={(e) => handleChange(e, 0, 0)} name="paragraphs" rows={10} cols={40} placeholder="Enter article body ..." className="mb-8" />
            <div className='flex flex-row'>
              <select value={formData[0].author} onChange={(e) => handleChange(e, 0)} name="author" className="border-y-8 w-[20vw]">
                <option value="author1">author1</option>
                <option value="author2">author2</option>
              </select>
              <select value={selectedCategory} onChange={handleCategoryChange} className="border-y-8 w-[20vw] ml-4">
                <option value="">Select Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select value={selectedSubCategory} onChange={handleSubCategoryChange} className="border-y-8 w-[20vw] ml-4">
                <option value="">Select Subcategory</option>
                {selectedCategory && categories[selectedCategory].map((subcategory) => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
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