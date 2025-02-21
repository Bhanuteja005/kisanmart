// OrdersTable.jsx
import { MoreVertical, Search } from "lucide-react";
import React from 'react';

const orders = [
  {
    id: "9629726341",
    date: "11/02/2025",
    status: "Need to Verify",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
  {
    id: "7577290375",
    date: "11/02/2025",
    status: "Need to Verify",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
  {
    id: "8283604276",
    date: "11/02/2025",
    status: "Verified",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
  {
    id: "6907623325",
    date: "11/02/2025",
    status: "Verified",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
  {
    id: "8091510234",
    date: "11/02/2025",
    status: "Verified",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
  {
    id: "7476825124",
    date: "11/02/2025",
    status: "Verified",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
  {
    id: "6853234432",
    date: "11/02/2025",
    status: "Verified",
    amount: "₹300",
    user: "Kshitij Pola 9629726341",
  },
];

const OrdersTable = () => {
  return (
    <div className="rounded-lg border bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">Latest Orders</h3>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Orders"
              className="pl-8 pr-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border rounded-md text-green-600 hover:bg-gray-50">
            Choose Dates
          </button>
          <div className="relative">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
              All Orders
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
            Customer
          </button>
          <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
            Dealer
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 p-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">User Details</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4 text-gray-500">{order.date}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Verified" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.amount}</td>
                <td className="p-4 text-gray-500">{order.user}</td>
                <td className="p-4">
                  <button className="text-green-600 hover:underline font-medium">
                    View
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <button className="text-green-600 hover:underline font-medium">
                      Accept
                    </button>
                    <div className="relative group">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                      <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                        <div className="py-1">
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            View details
                          </button>
                          <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                            Cancel order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;