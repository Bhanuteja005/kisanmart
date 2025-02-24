import { Calendar, MoveRight, Search } from "lucide-react";
import React, { useState } from 'react';

const OrdersTable = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const dateFilters = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "week" },
    { label: "This Month", value: "month" },
  ];

  const statusFilters = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending", color: "text-orange-600 bg-orange-50" },
    { label: "Verified", value: "verified", color: "text-green-600 bg-green-50" },
    { label: "Delivered", value: "delivered", color: "text-blue-600 bg-blue-50" }
  ];

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      {/* Header Section */}
      <div className="border-b p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              Total: 1,286
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500" size={20} />
            <select 
              className="border-0 bg-transparent text-gray-600 text-sm font-medium focus:ring-0"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dateFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b bg-gray-50/50 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders by ID, customer or product..."
              className="w-full md:w-[300px] pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-[#00922F] text-white'
                    : `${filter.color || 'bg-white'} border hover:bg-gray-50`
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Order ID", "Customer", "Product", "Amount", "Status", "Action"].map((header) => (
                <th key={header} className="py-4 px-6 text-left text-sm font-semibold text-gray-600 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <span className="font-medium text-[#00922F]">#{order.id}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{order.date}</span>
                    <span className="inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-xs text-gray-500">{order.time}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                      {order.user.charAt(0)}
                    </div>
                    <div>
                      <span className="font-medium block">{order.user}</span>
                      <span className="text-sm text-gray-500">{order.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 p-2">
                      <img src={order.productImage} alt="" className="w-full h-full object-cover rounded" />
                    </div>
                    <div>
                      <span className="font-medium block">{order.product}</span>
                      <span className="text-sm text-gray-500">Qty: {order.quantity}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-900">{order.amount}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    getStatusStyle(order.status)
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-[#00922F] opacity-0 group-hover:opacity-100 hover:text-[#007d28] font-medium flex items-center gap-2 transition-all">
                    View Details
                    <MoveRight className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-gray-500">
          Showing 1 to 10 of 1,286 orders
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, '...', 10].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                page === 1 ? 'bg-[#00922F] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  const styles = {
    "Verified": "bg-green-100 text-green-800",
    "Need to Verify": "bg-yellow-100 text-yellow-800",
    "Delivered": "bg-blue-100 text-blue-800",
    "Pending": "bg-orange-100 text-orange-800"
  };
  return styles[status] || "bg-gray-100 text-gray-800";
};

const orders = [
  {
    id: "9629726341",
    date: "Feb 15, 2024",
    status: "Need to Verify",
    amount: "₹3,200",
    user: "Kshitij Pola",
    phone: "+91 9629726341",
    product: "Tractor Engine Parts"
  },
  {
    id: "8547123690",
    date: "Feb 14, 2024",
    status: "Verified",
    amount: "₹4,500",
    user: "Rajesh Kumar",
    phone: "+91 8547123690",
    product: "Harvester Blades"
  },
  {
    id: "7412589630",
    date: "Feb 14, 2024",
    status: "Delivered",
    amount: "₹2,800",
    user: "Amit Patel",
    phone: "+91 7412589630",
    product: "Plough Assembly"
  },
  {
    id: "6398521470",
    date: "Feb 13, 2024",
    status: "Pending",
    amount: "₹5,600",
    user: "Suresh Singh",
    phone: "+91 6398521470",
    product: "Irrigation Pump"
  },
  {
    id: "9517534682",
    date: "Feb 13, 2024",
    status: "Need to Verify",
    amount: "₹1,900",
    user: "Priya Sharma",
    phone: "+91 9517534682",
    product: "Sprayer Parts"
  },
  {
    id: "8524697130",
    date: "Feb 12, 2024",
    status: "Delivered",
    amount: "₹7,200",
    user: "Deepak Verma",
    phone: "+91 8524697130",
    product: "Combine Parts"
  },
  {
    id: "7896541230",
    date: "Feb 12, 2024",
    status: "Verified",
    amount: "₹3,900",
    user: "Anita Reddy",
    phone: "+91 7896541230",
    product: "Thresher Belt"
  },
  {
    id: "6549873210",
    date: "Feb 11, 2024",
    status: "Pending",
    amount: "₹4,800",
    user: "Manoj Gupta",
    phone: "+91 6549873210",
    product: "Cultivator Tines"
  },
  {
    id: "9632587410",
    date: "Feb 11, 2024",
    status: "Delivered",
    amount: "₹6,500",
    user: "Kavita Yadav",
    phone: "+91 9632587410",
    product: "Rotavator Blades"
  },
  {
    id: "8521479630",
    date: "Feb 10, 2024",
    status: "Need to Verify",
    amount: "₹2,300",
    user: "Ramesh Choudhary",
    phone: "+91 8521479630",
    product: "Seeder Components"
  }
];

export default OrdersTable;