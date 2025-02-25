import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import CategoryDataTable from "../components/tables/CategoryDataTable";
import { categoriesAPI } from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching categories...');
      
      const categoriesResponse = await categoriesAPI.getAll();
      console.log('Categories response:', categoriesResponse);
      
      const subcategoriesResponse = await categoriesAPI.getAllSubcategories();
      console.log('Subcategories response:', subcategoriesResponse);

      if (categoriesResponse?.data) {
        setCategories(categoriesResponse.data);
      }
      
      if (subcategoriesResponse?.data) {
        setSubcategories(subcategoriesResponse.data);
      }
      
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, item) => {
    try {
      switch (action) {
        case 'delete':
          if (item.type === 'category') {
            await categoriesAPI.delete(item._id);
          } else {
            await categoriesAPI.deleteSubcategory(item._id);
          }
          toast.success(`${item.type === 'category' ? 'Category' : 'Subcategory'} deleted successfully`);
          fetchData(); // Refresh the list
          break;
          
        case 'edit':
          // Handle edit action
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
      toast.error('Action failed');
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Categories</h2>
        <div className="flex gap-4">
          <Link to="/dashboard/add-subcategory">
            <button className="rounded-lg flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors font-semibold text-white">
              <BsPlusLg className="text-lg" />
              <span>Add Subcategory</span>
            </button>
          </Link>
          <Link to="/dashboard/add-category">
            <button className="rounded-lg flex items-center gap-2 px-4 py-2 bg-[#00922F] hover:bg-[#007D28] transition-colors font-semibold text-white">
              <BsPlusLg className="text-lg" />
              <span>Add Category</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <CategoryDataTable 
          categories={categories}
          subcategories={subcategories}
          loading={loading}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default Categories;
