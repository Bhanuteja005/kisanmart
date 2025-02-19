import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useStatusContext } from "../context/ContextProvider";
import { addCategory } from '../firebase/categoryService';

const AddCategory = () => {
  const { activeMenu } = useStatusContext();
  const [isLoading, setIsLoading] = useState(false);
  const [subcategories, setSubcategories] = useState(['']);
  const navigate = useNavigate();

  const addSubcategory = () => {
    setSubcategories([...subcategories, '']);
  };

  const removeSubcategory = (index) => {
    const newSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(newSubcategories);
  };

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = value;
    setSubcategories(newSubcategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const categoryData = {
        name: e.target.categoryName.value,
        subcategories: subcategories.filter(sub => sub.trim() !== ''),
        isActive: true
      };
      
      await addCategory(categoryData);
      alert('Category added successfully!');
      navigate('/categories');
    } catch (error) {
      alert('Error adding category: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${activeMenu ? "ml-72" : "w-full"} mt-4 flex justify-center gap-1`}>
      <div className="w-full max-w-2xl mx-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Add Category</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Name *
            </label>
            <input
              name="categoryName"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter category name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subcategories
            </label>
            {subcategories.map((subcategory, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  value={subcategory}
                  onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter subcategory name"
                />
                <button
                  type="button"
                  onClick={() => removeSubcategory(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubcategory}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              + Add Subcategory
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
