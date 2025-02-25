import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const DealerDataTable = ({ dealers = [], onDealerAction, loading }) => {
  const columns = [
    {
      field: "name",
      headerName: "Dealer Name",
      flex: 1.2,
      minWidth: 180,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
            {params.value.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{params.value}</span>
            <span className="text-xs text-gray-500">{params.row.email}</span>
          </div>
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "Contact",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastOrder",
      headerName: "Last Order",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span>{new Date(params.value).toLocaleDateString()}</span>
          <span className="text-xs text-gray-500">{params.row.totalOrders} orders total</span>
        </div>
      ),
    },
    {
      field: "revenue",
      headerName: "Revenue",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="font-medium">{params.value}</span>
          <span className="text-xs text-green-600">+12.5% vs last month</span>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          params.value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
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
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip title="View Details">
            <IconButton className="text-blue-600 hover:text-blue-700">
              <GrFormView className="text-xl" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Dealer">
            <IconButton className="text-green-600 hover:text-green-700">
              <FiEdit2 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton className="text-red-600 hover:text-red-700">
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-[calc(100vh-200px)]">
      <DataGrid
        rows={dealers}
        columns={columns}
        getRowId={(row) => row._id || row.id}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        getRowClassName={() => 'group'} // For hover effects
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
          }
        }}
      />
    </div>
  );
};

export default DealerDataTable;
