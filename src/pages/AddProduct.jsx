import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";
import { getCategories } from '../firebase/categoryService';
import { addProduct } from '../firebase/productService';

const AddProduct = () => {
  const [productImageUpload, setProductImageUpload] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState('single');
  const [variants, setVariants] = useState([{ 
    name: '', 
    color: '', 
    cost: '', 
    stock: '',
    sku: '' 
  }]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
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
    e.preventDefault();
    setIsLoading(true);
    
    try {
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
      };

      await addProduct(formData, productImageUpload);
      alert('Product added successfully!');
      e.target.reset();
      setProductImageUpload([]);
      setImageURLs([]);
      setVariants([{ name: '', color: '', cost: '', stock: '', sku: '' }]);
    } catch (error) {
      alert('Error adding product: ' + error.message);
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
              type="submit"
              className="px-6 py-3 bg-[#00922F] text-white rounded-lg hover:bg-[#007D28] transition-colors font-semibold disabled:opacity-50"
              disabled={isLoading}
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
