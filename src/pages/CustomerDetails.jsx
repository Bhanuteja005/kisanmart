import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Customer Details</h2>
        <Link to={`/dashboard/edit-customer/${id}`}>
          <button className="rounded-lg flex items-center gap-2 px-4 py-2 bg-[#00922F] hover:bg-[#007D28] transition-colors font-semibold text-white">
            <FiEdit2 className="text-lg" />
            <span>Edit Customer</span>
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-40 h-40 rounded-full border-4 border-[#DFF1E6] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/default.png"
                alt="customer profile"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">snow</h3>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm text-gray-500 font-medium">Email</label>
                <p className="text-gray-900 font-semibold mt-1">example@gmail.com</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm text-gray-500 font-medium">Phone</label>
                <p className="text-gray-900 font-semibold mt-1">+91 9999999999</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm text-gray-500 font-medium">Age</label>
                <p className="text-gray-900 font-semibold mt-1">26</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm text-gray-500 font-medium">Member Since</label>
                <p className="text-gray-900 font-semibold mt-1">Jan 2023</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm text-gray-500 font-medium">Total Orders</label>
                <p className="text-gray-900 font-semibold mt-1">15</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm text-gray-500 font-medium">Total Spent</label>
                <p className="text-gray-900 font-semibold mt-1">₹25,000</p>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h4>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3].map((order) => (
                      <tr key={order} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order}23456</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-01-{order}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order * 1000}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
