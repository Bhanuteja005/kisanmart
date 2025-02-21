import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductDataTable from "../components/tables/ProductDataTable";
import { useStatusContext } from "../context/ContextProvider";

const Products = () => {
  const { activeMenu } = useStatusContext();
  return (
    <div className={`${activeMenu ? "ml-72" : "w-full"} p-4`}>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-black">All Products</h2>
          <Link to="/add-product">
            <button className="rounded-lg flex items-center gap-2 hover:bg-blue-light px-4 py-2 bg-blue font-semibold text-lg text-white">
              <BsPlusLg />
              <span>Add Product</span>
            </button>
          </Link>
        </div>
        <ProductDataTable />
      </div>
    </div>
  );
};

export default Products;
