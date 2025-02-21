import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductDataTable from "../components/tables/ProductDataTable";

const Products = () => {
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
        <ProductDataTable />
      </div>
    </div>
  );
};

export default Products;
