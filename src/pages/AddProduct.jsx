import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { getCategories, getSubcategories } from '../services/categoryService';
import { addProduct } from '../services/productService';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    subTitle: '',
    category: '',
    subcategory: '',
    description: '',
    cost: '',
    dealerCost: '',
    stockQuantity: '',
    moq: '',
    gst: '',
    discount: '',
    bestSeller: false
  });
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Error loading categories');
    }
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setProductData(prev => ({ ...prev, category: categoryId, subcategory: '' }));
    
    if (categoryId) {
      try {
        const response = await getSubcategories(categoryId);
        setSubcategories(response.data);
      } catch (error) {
        toast.error('Error loading subcategories');
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });

      productImages.forEach((image, index) => {
        formData.append(`productImage${index}`, image);
      });

      await addProduct(formData);
      toast.success('Product added successfully!');
      
      // Reset form
      setProductData({
        name: '',
        subTitle: '',
        category: '',
        subcategory: '',
        description: '',
        cost: '',
        dealerCost: '',
        stockQuantity: '',
        moq: '',
        gst: '',
        discount: '',
        bestSeller: false
      });
      setProductImages([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Add Product</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <div className="flex flex-wrap gap-4">
              <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="text-gray-600">Add Images</span>
              </label>
              {productImages.map((image, index) => (
                <div key={index} className="relative w-32 h-32">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name*</label>
              <input
                type="text"
                name="name"
                required
                value={productData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Title</label>
              <input
                type="text"
                name="subTitle"
                value={productData.subTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category*</label>
              <select
                name="category"
                required
                value={productData.category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory*</label>
              <select
                name="subcategory"
                required
                value={productData.subcategory}
                onChange={handleInputChange}
                disabled={!productData.category}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing and Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost Price*</label>
              <input
                type="number"
                name="cost"
                required
                value={productData.cost}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dealer Price*</label>
              <input
                type="number"
                name="dealerCost"
                required
                value={productData.dealerCost}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Quantity*</label>
              <input
                type="number"
                name="stockQuantity"
                required
                value={productData.stockQuantity}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">MOQ</label>
              <input
                type="number"
                name="moq"
                value={productData.moq}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">GST (%)</label>
              <input
                type="number"
                name="gst"
                value={productData.gst}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows={4}
              value={productData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Best Seller Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="bestSeller"
              checked={productData.bestSeller}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Mark as Best Seller</label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#00922F] text-white rounded-lg hover:bg-[#007D28] transition-colors font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
