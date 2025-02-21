import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([
    { id: 1, name: "John Doe", phone: "1234567890", email: "john@example.com", role: "Admin", joined: "2024-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", phone: "9876543210", email: "jane@example.com", role: "Staff", joined: "2024-02-10", status: "Active" }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    email: "",
    role: "Staff",
    status: "Active"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStaffList([...staffList, { ...newStaff, id: staffList.length + 1, joined: new Date().toISOString().split('T')[0] }]);
    setIsModalOpen(false);
    setNewStaff({ name: "", phone: "", email: "", role: "Staff", status: "Active" });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Staff Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg flex items-center gap-2 px-4 py-2 bg-[#00922F] hover:bg-[#007D28] transition-colors font-semibold text-white"
        >
          <BsPlusLg className="text-lg" />
          <span>Add Staff</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600 border-b border-r">Name</th>
                <th className="p-4 text-left font-semibold text-gray-600 border-b border-r">Email</th>
                <th className="p-4 text-left font-semibold text-gray-600 border-b border-r">Phone</th>
                <th className="p-4 text-left font-semibold text-gray-600 border-b border-r">Role</th>
                <th className="p-4 text-left font-semibold text-gray-600 border-b border-r">Status</th>
                <th className="p-4 text-left font-semibold text-gray-600 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="p-4 border-r">{staff.name}</td>
                  <td className="p-4 border-r">{staff.email}</td>
                  <td className="p-4 border-r">{staff.phone}</td>
                  <td className="p-4 border-r">{staff.role}</td>
                  <td className="p-4 border-r">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <FaEdit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Staff</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <IoMdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name*</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  placeholder="Enter staff name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone*</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                >
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newStaff.status}
                  onChange={(e) => setNewStaff({...newStaff, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#00922F] text-white rounded-md hover:bg-[#007D28]"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
