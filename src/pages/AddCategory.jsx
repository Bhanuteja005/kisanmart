import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { categoriesAPI } from '../services/api';

const AddCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    isSubcategory: false,
    categoryId: '', // For subcategories
    categoryName: '', // For subcategories
    isActive: true
  });

  useEffect(() => {
    if (formData.isSubcategory) {
      fetchParentCategories();
    }
  }, [formData.isSubcategory]);

  const fetchParentCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setParentCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch parent categories');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.isSubcategory) {
        // Handle subcategory creation
        const subcategoryData = {
          name: formData.name,
          description: formData.description,
          categoryId: formData.categoryId,
          isActive: true
        };

        await categoriesAPI.createSubcategory(subcategoryData);
        toast.success('Subcategory added successfully');
      } else {
        // Handle category creation
        const categoryData = {
          name: formData.name,
          description: formData.description,
          image: formData.image,
          isActive: true
        };

        await categoriesAPI.create(categoryData);
        toast.success('Category added successfully');
      }

      navigate('/dashboard/categories');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to add category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Add New {formData.isSubcategory ? 'Subcategory' : 'Category'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="isSubcategory"
            value={formData.isSubcategory}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              isSubcategory: e.target.value === 'true',
              categoryId: '' // Reset parent category when switching types
            }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="false">Main Category</option>
            <option value="true">Subcategory</option>
          </select>
        </div>

        {formData.isSubcategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select Parent Category</option>
              {parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700"
            accept="image/*"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/categories')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : `Add ${formData.isSubcategory ? 'Subcategory' : 'Category'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
