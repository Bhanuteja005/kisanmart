import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiEdit2, FiPlusCircle, FiSearch } from "react-icons/fi";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from '../../firebase/productService';

const ProductDataTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModel, setFilterModel] = useState({
    category: 'all',
    subcategory: 'all',
    searchQuery: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEntry = () => {
    navigate('/add-product');
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
        alert('Product deleted successfully');
      } catch (error) {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  const handleView = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      sortable: true,
      renderCell: (params) => (
        <div className="font-medium text-gray-600 truncate">
          {params.value}
        </div>
      )
    },
    {
      field: "orderId",
      headerName: "Order ID",
      flex: 1,
      minWidth: 120,
      sortable: true,
      renderCell: (params) => (
        <div className="font-medium text-gray-900">
          {params.value || 'N/A'}
        </div>
      )
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1.5,
      minWidth: 180,
      sortable: true,
      renderCell: (params) => (
        <div className="font-medium text-gray-900 truncate">
          {params.value}
        </div>
      )
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 120,
      sortable: true,
      renderCell: (params) => (
        <div className="truncate">{params.value}</div>
      )
    },
    {
      field: "subcategory",
      headerName: "Sub-category",
      flex: 1,
      minWidth: 120,
      sortable: true,
      renderCell: (params) => (
        <div className="truncate">{params.value}</div>
      )
    },
    {
      field: "cost",
      headerName: "Price",
      flex: 0.8,
      minWidth: 100,
      sortable: true,
      renderCell: (params) => (
        <div className="font-medium">₹{params.value}</div>
      )
    },
    {
      field: "image",
      headerName: "Image",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <div className="w-12 h-12">
          <img
            src={params.row.imageUrls?.[0] || '/default.png'}
            alt={params.row.productName}
            className="w-full h-full rounded-lg object-cover"
            onError={(e) => { e.target.src = '/default.png'; }}
          />
        </div>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div className="flex gap-1 justify-center w-full">
          <Tooltip title="View">
            <IconButton onClick={() => handleView(params.row.id)} size="small">
              <GrFormView />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row.id)} size="small">
              <FiEdit2 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)} size="small">
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <div className=" p-6 rounded-lg shadow-lg w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleNewEntry}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlusCircle /> New Entry
        </button>
      </div>

      {/* Filters - Updated grid layout */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-3 relative">
          <select
            className="w-full p-2 border rounded-lg appearance-none pr-10"
            onChange={(e) => setFilterModel({ ...filterModel, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="verified">Verified</option>
            <option value="unverified">Need to Verify</option>
          </select>
          <FiChevronDown className="absolute right-3 top-3" />
        </div>

        <div className="col-span-3 relative">
          <select
            className="w-full p-2 border rounded-lg appearance-none pr-10"
            onChange={(e) => setFilterModel({ ...filterModel, subcategory: e.target.value })}
          >
            <option value="all">All Sub-categories</option>
            <option value="verified">Verified</option>
            <option value="unverified">Need to Verify</option>
          </select>
          <FiChevronDown className="absolute right-3 top-3" />
        </div>

        <div className="col-span-6 relative">
          <input
            type="text"
            placeholder="Search Orders"
            className="w-full p-2 border rounded-lg pl-10"
            onChange={(e) => setFilterModel({ ...filterModel, searchQuery: e.target.value })}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Updated Data Grid with divider styling */}
      <div className="w-full h-[calc(100vh-280px)]">
        {loading ? (
          <div className="flex justify-center items-center h-full">Loading...</div>
        ) : (
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.id || Math.random().toString()}
            components={{
              NoRowsOverlay: () => (
                <div className="flex justify-center items-center h-full">No products found</div>
              ),
            }}
            className="border-none"
            autoHeight
            sx={{
              '& .MuiDataGrid-cell': {
                borderRight: '1px solid #e0e0e0',
                padding: '8px 16px',
              },
              '& .MuiDataGrid-columnHeader': {
                borderRight: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                padding: '12px 16px',
                '&:last-child': {
                  borderRight: 'none',
                },
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(even)': {
                  backgroundColor: '#fafafa',
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '2px solid #e0e0e0',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDataTable;
