import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { GrFormView } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([
    { id: 1, name: "John Doe", phone: "1234567890", email: "john@example.com", role: "Admin", joined: "2024-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", phone: "9876543210", email: "jane@example.com", role: "Staff", joined: "2024-02-10", status: "Active" }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading] = useState(false);
  // Add newStaff state
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    email: "",
    role: "Staff",
    status: "Active"
  });

  // Reset form function
  const resetForm = () => {
    setNewStaff({
      name: "",
      phone: "",
      email: "",
      role: "Staff",
      status: "Active"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStaffList([...staffList, { 
      ...newStaff, 
      id: staffList.length + 1, 
      joined: new Date().toISOString().split('T')[0] 
    }]);
    setIsModalOpen(false);
    resetForm();
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.8,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Tooltip title="View">
            <IconButton onClick={() => console.log('View:', params.row.id)}>
              <GrFormView />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => console.log('Edit:', params.row.id)}>
              <FiEdit2 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => console.log('Delete:', params.row.id)}>
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

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

      <div className="w-full h-full bg-white rounded-lg shadow-md">
        <div className="w-full h-[calc(100vh-200px)]">
          <DataGrid
            rows={staffList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            loading={loading}
            sx={{
              border: '1px solid #e0e0e0',
              '& .MuiDataGrid-cell': {
                borderRight: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
                padding: '8px 16px',
              },
              '& .MuiDataGrid-columnHeader': {
                borderRight: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                padding: '12px 16px',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '2px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(even)': {
                  backgroundColor: '#fafafa',
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '2px solid #e0e0e0',
              },
              '& .MuiCheckbox-root': {
                color: '#00922f',
              },
              '& .MuiDataGrid-columnHeaderCheckbox': {
                borderRight: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-cellCheckbox': {
                borderRight: '1px solid #e0e0e0',
              }
            }}
          />
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
