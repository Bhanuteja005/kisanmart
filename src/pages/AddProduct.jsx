import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { categoriesAPI, productsAPI } from '../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    subTitle: '',
    categoryId: '',
    subcategoryId: '',
    productType: 'single', // or 'variant'
    costPrice: '',
    dealerCost: '',
    stockQuantity: '',
    minimumOrderQuantity: '1',
    gst: '',
    discount: '0',
    productDescription: '',
    imageUrl: null,
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await categoriesAPI.getAll();
      console.log('Categories fetched:', response.data);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return;
    
    try {
      setIsLoading(true);
      const response = await categoriesAPI.getSubcategories(categoryId);
      console.log('Raw subcategories response:', response);

      // Handle different response structures
      let subcategoriesData = [];
      if (Array.isArray(response)) {
        subcategoriesData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        subcategoriesData = response.data;
      } else if (typeof response === 'object') {
        // If response is an object, try to find an array property
        const arrayData = Object.values(response).find(val => Array.isArray(val));
        subcategoriesData = arrayData || [];
      }

      console.log('Processed subcategories data:', subcategoriesData);
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      toast.error('Failed to fetch subcategories');
      setSubcategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formData.categoryId) {
      fetchSubcategories(formData.categoryId);
    } else {
      setSubcategories([]); // Reset subcategories when no category is selected
    }
  }, [formData.categoryId]);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    console.log('Selected category:', categoryId);

    setFormData(prev => ({
      ...prev,
      categoryId,
      subcategoryId: '' // Reset subcategory when category changes
    }));

    if (categoryId) {
      try {
        setIsLoading(true);
        const response = await categoriesAPI.getSubcategories(categoryId);
        console.log('Subcategories response:', response);
        
        if (Array.isArray(response)) {
          setSubcategories(response);
        } else if (Array.isArray(response.data)) {
          setSubcategories(response.data);
        } else {
          console.error('Invalid subcategories data:', response);
          setSubcategories([]);
        }
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
        toast.error('Failed to fetch subcategories');
        setSubcategories([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Format the data according to the API requirements
      const productData = {
        productName: formData.productName,
        subTitle: formData.subTitle,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        productType: formData.productType,
        costPrice: parseFloat(formData.costPrice),
        dealerCost: parseFloat(formData.dealerCost),
        stockQuantity: parseInt(formData.stockQuantity),
        minimumOrderQuantity: parseInt(formData.minimumOrderQuantity),
        gst: parseFloat(formData.gst),
        discount: parseFloat(formData.discount),
        productDescription: formData.productDescription,
        isActive: formData.isActive
      };

      // Append all product data
      Object.keys(productData).forEach(key => {
        formDataToSend.append(key, productData[key]);
      });

      // Append image if exists
      if (formData.imageUrl) {
        formDataToSend.append('image', formData.imageUrl);
      }

      console.log('Sending product data:', productData);
      const response = await productsAPI.create(formDataToSend);
      console.log('Product created:', response);

      toast.success('Product added successfully');
      navigate('/dashboard/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product. Please check all fields.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update the form validation function
  const isFormValid = () => {
    const numberFields = {
      costPrice: parseFloat(formData.costPrice),
      dealerCost: parseFloat(formData.dealerCost),
      stockQuantity: parseInt(formData.stockQuantity || '0'),
      minimumOrderQuantity: parseInt(formData.minimumOrderQuantity),
      gst: parseFloat(formData.gst),
      discount: parseFloat(formData.discount)
    };

    // Debug log
    console.log('Form validation:', {
      hasProductName: !!formData.productName,
      hasCategoryId: !!formData.categoryId,
      hasSubcategoryId: !!formData.subcategoryId,
      numbers: numberFields
    });

    return (
      formData.productName?.trim() &&
      formData.categoryId &&
      formData.subcategoryId &&
      !isNaN(numberFields.costPrice) && numberFields.costPrice > 0 &&
      !isNaN(numberFields.dealerCost) && numberFields.dealerCost > 0 &&
      !isNaN(numberFields.minimumOrderQuantity) && numberFields.minimumOrderQuantity > 0
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub Title</label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cost Price</label>
            <input
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dealer Cost</label>
            <input
              type="number"
              name="dealerCost"
              value={formData.dealerCost}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">GST (%)</label>
            <input
              type="number"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              required
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Min. Order Qty</label>
            <input
              type="number"
              name="minimumOrderQuantity"
              value={formData.minimumOrderQuantity}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleCategoryChange} // Use the new handler
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
              {isLoading && formData.categoryId && 
                <span className="ml-2 text-xs text-gray-500">Loading...</span>
              }
            </label>
            <select
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                subcategoryId: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              disabled={!formData.categoryId || isLoading}
            >
              <option value="">Select Subcategory</option>
              {Array.isArray(subcategories) && subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/products')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;