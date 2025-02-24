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
  const [variants, setVariants] = useState([{ name: '', color: '', cost: '', stock: '', sku: '' }]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  useEffect(() => {
    if (productImageUpload.length < 1) return;
    const newImageUrls = productImageUpload.map(image => URL.createObjectURL(image));
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

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = {
        productName: e.target.productName.value,
        subTitle: e.target.subTitle.value,
        category: e.target.category.value,
        subcategory: e.target.subcategory.value,
        productType,
        description: e.target.description.value,
        isStockAvailable: true,
        published: true,
        cost: Number(e.target.cost.value),
        dealerCost: Number(e.target.dealerCost.value),
        stockQuantity: Number(e.target.stockQuantity.value),
        moq: Number(e.target.moq.value),
        gst: Number(e.target.gst.value),
        discount: Number(e.target.discount.value),
        bestSeller,
        variants: productType === 'multi' ? variants : null,
      };

      await addProduct(formData, productImageUpload);
      alert('Product added successfully!');
      e.target.reset();
      setProductImageUpload([]);
      setImageURLs([]);
      setVariants([{ name: '', color: '', cost: '', stock: '', sku: '' }]);
      setBestSeller(false);
    } catch (error) {
      alert('Error adding product: ' + error.message);
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
        <form onSubmit={handleForm}>
          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={bestSeller} onChange={() => setBestSeller(!bestSeller)} />
              <span className="text-xl font-extrabold text-gray-medium">Best Seller</span>
            </label>
          </div>

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
