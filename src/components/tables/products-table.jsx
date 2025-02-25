import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const ProductsTable = () => {
  const products = [
    {
      name: "Tractor Parts Kit",
      category: "Machinery Parts",
      stock: 5,
      status: "Low Stock",
      price: "₹25,000"
    },
    {
      name: "Premium Seeds Pack",
      category: "Seeds",
      stock: 150,
      status: "In Stock",
      price: "₹2,500"
    },
    {
      name: "Harvesting Tools Set",
      category: "Farm Tools",
      stock: 3,
      status: "Low Stock",
      price: "₹12,000"
    },
    {
      name: "Fertilizer Pack",
      category: "Fertilizers",
      stock: 80,
      status: "In Stock",
      price: "₹1,500"
    },
    {
      name: "Irrigation System",
      category: "Equipment",
      stock: 8,
      status: "Low Stock",
      price: "₹35,000"
    }
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Product Inventory Status</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-700">{product.name}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-600">{product.category}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-600">{product.stock}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-600">{product.price}</span>
                </td>
                <td className="py-3 px-4">
                  {product.stock <= 10 ? (
                    <div className="flex items-center gap-1 text-red-600">
                      <FiAlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Low Stock</span>
                    </div>
                  ) : (
                    <span className="text-green-600 text-sm font-medium">In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;