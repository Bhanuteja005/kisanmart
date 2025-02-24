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
<<<<<<< HEAD
  const [productType, setProductType] = useState('single');
  const [bestSeller, setBestSeller] = useState(false);
  const [variants, setVariants] = useState([{ 
    name: '', 
    color: '', 
    cost: '', 
    stock: '',
    sku: '' 
  }]);
=======
>>>>>>> c822269a74d89d50d87e4b40289a532d76d9cde3
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    if (productImageUpload.length < 1) return;
    const newImageUrls = [];
    productImageUpload.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
  }, [productImageUpload]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
    if (e.target.value === 'single') {
      setVariants([{ name: '', color: '', cost: '', stock: '', sku: '' }]);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', color: '', cost: '', stock: '', sku: '' }]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleForm = async (e) => {
=======
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
>>>>>>> c822269a74d89d50d87e4b40289a532d76d9cde3
    e.preventDefault();
    setIsLoading(true);
    
    try {
<<<<<<< HEAD
      const formData = {
        productName: e.target.productName.value,
        subTitle: e.target.subTitle.value,
        category: e.target.category.value,
        subcategory: e.target.subcategory.value,
        productType: productType,
        description: e.target.description.value,
        isStockAvailable: true,
        published: true,
        // Base product details always included
        cost: Number(e.target.cost.value),
        dealerCost: Number(e.target.dealerCost.value),
        stockQuantity: Number(e.target.stockQuantity.value),
        moq: Number(e.target.moq.value),
        gst: Number(e.target.gst.value),
        discount: Number(e.target.discount.value),
        // Include variants if multi-variant
        variants: productType === 'multi' ? variants : null,
        bestSeller: e.target.bestSeller ? e.target.bestSeller.checked : false, 
      };

      await addProduct(formData, productImageUpload);
      alert('Product added successfully!');
      e.target.reset();
      setProductImageUpload([]);
      setImageURLs([]);
      setVariants([{ name: '', color: '', cost: '', stock: '', sku: '' }]);
=======
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
>>>>>>> c822269a74d89d50d87e4b40289a532d76d9cde3
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductImages = (e) => {
    setProductImageUpload([...productImageUpload, ...e.target.files]);
  };

  const removeSelectedImage = (imgSrc) => {
    const filterImageURlS = imageURLS.filter((item) => item !== imgSrc);
    const filterProductImageUpload = productImageUpload.filter((item) => {
      return URL.createObjectURL(item) === imgSrc; // Fixed return statement
    });
    setProductImageUpload(filterProductImageUpload);
    setImageURLs(filterImageURlS);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    const category = categories.find(cat => cat.id === categoryId);
    setSubcategories(category ? category.subcategories : []);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Add Product</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
<<<<<<< HEAD
        <form onSubmit={handleForm}>
          {/* Image Upload Section */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <label
                htmlFor="imgUpload"
                className="cursor-pointer rounded-full w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FiCamera className="text-xl text-gray-600" />
              </label>
              <div className="flex gap-2">
                {imageURLS.map((imageSrc) => (
                  <img
                    onClick={() => removeSelectedImage(imageSrc)}
                    key={imageSrc}
                    className="w-24 h-24 object-cover border rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    src={imageSrc}
                    alt="product preview"
                  />
                ))}
              </div>
            </div>
            <input
              className="hidden"
              multiple
              accept="image/png, image/jpg, image/gif, image/jpeg"
              id="imgUpload"
              type="file"
              onChange={handleProductImages}
            />
          </div>

          {/* Form Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="w-full mb-4">
                <label
                  htmlFor="productName"
                  className="mr-2  text-xl font-extrabold text-gray-medium"
                >
                  Product Name *
                </label>
                <input
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                  type="text"
                  id="productName"
                  required
                />
              </div>

              <div className="w-full mb-4">
                <label
                  htmlFor="subTitle"
                  className="mr-2  text-xl font-extrabold text-gray-medium"
                >
                  Sub Title
                </label>
                <input
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                  type="text"
                  id="subTitle"
                />
              </div>

              <div className="w-full mb-4">
                <label
                  htmlFor="category"
                  className="mr-2  text-xl font-extrabold text-gray-medium"
                >
                  Category *
                </label>
                <select
                  id="category"
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                  required
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full mb-4">
                <label
                  htmlFor="subcategory"
                  className="mr-2  text-xl font-extrabold text-gray-medium"
                >
                  Sub Category
                </label>
                <select
                  id="subcategory"
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                >
                  <option value="">Select Sub Category</option>
                  {subcategories.map((subcat, index) => (
                    <option key={index} value={subcat}>
                      {subcat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full mb-4">
                <label
                  htmlFor="productType"
                  className="mr-2  text-xl font-extrabold text-gray-medium"
                >
                  Product Type *
                </label>
                <select
                  id="productType"
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                  required
                  value={productType}
                  onChange={handleProductTypeChange}
                >
                  <option value="single">Single Product</option>
                  <option value="multi">Multi Variant Product</option>
                </select>
              </div>
            </div>

            {/* Pricing and Stock Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full mb-4">
                  <label
                    htmlFor="cost"
                    className="mr-2  text-xl font-extrabold text-gray-medium"
                  >
                    Cost Price *
                  </label>
                  <input
                    className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                    type="number"
                    id="cost"
                    required
                  />
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="dealerCost"
                    className="mr-2  text-xl font-extrabold text-gray-medium"
                  >
                    Dealer Cost
                  </label>
                  <input
                    className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                    type="number"
                    id="dealerCost"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="w-full mb-4">
                  <label
                    htmlFor="stockQuantity"
                    className="mr-2  text-xl font-extrabold text-gray-medium"
                  >
                    Stock Quantity *
                  </label>
                  <input
                    className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                    type="number"
                    id="stockQuantity"
                    required
                  />
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="moq"
                    className="mr-2  text-xl font-extrabold text-gray-medium"
                  >
                    Minimum Order Quantity
                  </label>
                  <input
                    className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                    type="number"
                    id="moq"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="w-full mb-4">
                  <label
                    htmlFor="gst"
                    className="mr-2  text-xl font-extrabold text-gray-medium"
                  >
                    GST (%) *
                  </label>
                  <input
                    className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                    type="number"
                    id="gst"
                    required
                  />
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="discount"
                    className="mr-2  text-xl font-extrabold text-gray-medium"
                  >
                    Discount (%)
                  </label>
                  <input
                    className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                    type="number"
                    id="discount"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Variants Section - Full Width */}
          {productType === 'multi' && (
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Product Variants</h3>
                <button
                  type="button"
                  onClick={addVariant}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 transition-colors"
                >
                  <AiOutlinePlusCircle className="text-xl" />
                  <span>Add Variant</span>
                </button>
              </div>
              
              {variants.map((variant, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-md font-semibold">Variant #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={addVariant}
                        className="text-green-500 hover:text-green-700 transition-colors"
                      >
                        <AiOutlinePlusCircle className="text-xl" />
                      </button>
                    </div>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full mb-4">
                      <label className="text-sm font-semibold text-gray-medium">Variant Name *</label>
                      <input
                        type="text"
                        required
                        value={variant.name}
                        onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                        className="border outline-none w-full text-md font-semibold text-gray-dark rounded-lg p-2"
                        placeholder="e.g. Small, Medium, Large"
                      />
                    </div>
                    
                    <div className="w-full mb-4">
                      <label className="text-sm font-semibold text-gray-medium">Color/Type</label>
                      <input
                        type="text"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        className="border outline-none w-full text-md font-semibold text-gray-dark rounded-lg p-2"
                        placeholder="e.g. Red, Blue, XL"
                      />
                    </div>
                    
                    <div className="w-full mb-4">
                      <label className="text-sm font-semibold text-gray-medium">Cost *</label>
                      <input
                        type="number"
                        required
                        value={variant.cost}
                        onChange={(e) => handleVariantChange(index, 'cost', e.target.value)}
                        className="border outline-none w-full text-md font-semibold text-gray-dark rounded-lg p-2"
                      />
                    </div>
                    
                    <div className="w-full mb-4">
                      <label className="text-sm font-semibold text-gray-medium">Stock *</label>
                      <input
                        type="number"
                        required
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                        className="border outline-none w-full text-md font-semibold text-gray-dark rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Description - Full Width */}
          <div className="mt-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="description"
            >
              Product Description *
            </label>
            <textarea
              className="w-full border rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
              id="description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button 
=======
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
>>>>>>> c822269a74d89d50d87e4b40289a532d76d9cde3
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
