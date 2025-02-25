import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductDataTable = ({ products, loading, onProductAction }) => {
  const columns = [
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img 
            src={params.row.imageUrl} 
            alt={params.value}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium">{params.value}</span>
            <span className="text-xs text-gray-500">{params.row.subTitle}</span>
          </div>
        </div>
      )
    },
    {
      field: 'costPrice',
      headerName: 'Cost Price',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => `₹${params.value.toFixed(2)}`
    },
    {
      field: 'dealerCost',
      headerName: 'Dealer Price',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => `₹${params.value.toFixed(2)}`
    },
    {
      field: 'stockQuantity',
      headerName: 'Stock',
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => (
        <span className={params.value < 10 ? 'text-red-600' : 'text-green-600'}>
          {params.value}
        </span>
      )
    },
    {
      field: 'gst',
      headerName: 'GST',
      flex: 0.3,
      minWidth: 70,
      renderCell: (params) => `${params.value}%`
    },
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 0.3,
      minWidth: 80,
      renderCell: (params) => params.value > 0 ? `${params.value}%` : '-'
    },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 0.4,
      minWidth: 100,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {params.value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-product/${params.row._id}`}>
            <button className="p-1 text-blue-600 hover:text-blue-800">
              <FiEdit2 />
            </button>
          </Link>
          <button 
            onClick={() => onProductAction('delete', params.row._id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <FiTrash2 />
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        loading={loading}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductDataTable;
