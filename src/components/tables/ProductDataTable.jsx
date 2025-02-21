import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from '../../firebase/productService';

const ProductDataTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "cost",
      headerName: "Price",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <div className="font-medium">₹{params.value}</div>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <div className={parseInt(params.value) < 10 ? 'text-red-600' : 'text-green-600'}>
          {params.value}
        </div>
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
            <IconButton onClick={() => navigate(`/dashboard/product-details/${params.row.id}`)}>
              <GrFormView />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/dashboard/edit-product/${params.row.id}`)}>
              <FiEdit2 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md">

      <div className="w-full h-[calc(100vh-200px)]"> {/* Adjusted height */}
        <DataGrid
          rows={products}
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
  );
};

export default ProductDataTable;
