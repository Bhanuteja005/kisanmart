import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductDataTable from "../components/tables/ProductDataTable";
import { productsAPI } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleProductAction = async (action, productId) => {
    try {
      switch (action) {
        case 'delete':
          await productsAPI.delete(productId);
          toast.success('Product deleted successfully');
          fetchProducts(); // Refresh list
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Products</h2>
        <Link to="/dashboard/add-product">
          <button className="rounded-lg flex items-center gap-2 px-4 py-2 bg-[#00922F] hover:bg-[#007D28] transition-colors font-semibold text-white">
            <BsPlusLg className="text-lg" />
            <span>Add Product</span>
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <ProductDataTable 
          products={products}
          loading={loading}
          onProductAction={handleProductAction}
        />
      </div>
    </div>
  );
};

export default Products;
