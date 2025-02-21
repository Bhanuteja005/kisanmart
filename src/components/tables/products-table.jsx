import { AlertTriangle } from "lucide-react";
import React from "react";

const products = [
  {
    name: "Kshitij Pola",
    category: "Kshitij Pola",
    subCategory: "Kshitij Pola",
    quantity: "03",
    status: "low",
  },
  {
    name: "Kshitij Pola",
    category: "Kshitij Pola",
    subCategory: "Kshitij Pola",
    quantity: "06",
    status: "low",
  },
  {
    name: "Kshitij Pola",
    category: "Kshitij Pola",
    subCategory: "Kshitij Pola",
    quantity: "01",
    status: "out",
  },
  {
    name: "Kshitij Pola",
    category: "Kshitij Pola",
    subCategory: "Kshitij Pola",
    quantity: "00",
    status: "out",
  },
];

const ProductsTable = () => {
  return (
    <div className="rounded-lg border bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">Products</h3>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-600">
            <AlertTriangle className="h-3 w-3" /> Low Stock: 03
          </span>
          <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs text-red-600">
            <AlertTriangle className="h-3 w-3" /> Out of Stock: 01
          </span>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-4 text-left">Product Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Sub-Category</th>
            <th className="p-4 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.subCategory}</td>
              <td className="p-4">
                <span className={`flex items-center ${
                  product.status === "out" ? "text-red-600" : "text-amber-600"
                }`}>
                  {product.quantity}
                  <AlertTriangle className="ml-1 h-3 w-3" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t p-4">
        <button 
          onClick={() => window.location.href = '/dashboard/products'} 
          className="text-sm font-medium text-green-600 hover:underline"
        >
          All Products →
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;