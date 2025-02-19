import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from 'react';
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
      const formattedProducts = productsData.map(product => ({
        ...product,
        action: {
          edit: <FiEdit2 />,
          delete: <MdDeleteOutline />,
          view: <GrFormView />,
        }
      }));
      setProducts(formattedProducts);
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

  const handleView = (productId) => {
    try {
      console.log('Viewing product:', productId);
      navigate(`/product-details/${productId}`, { replace: false });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <div className="cursor-pointer">
        <Tooltip title="View" placement="left" arrow>
          <IconButton onClick={(e) => {
            e.stopPropagation();
            handleView(params.row.id);
          }}>
            <GrFormView />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={(e) => {
            e.stopPropagation();
            handleEdit(params.row.id);
          }}>
            <FiEdit2 />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="right" arrow>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <MdDeleteOutline />
          </IconButton>
        </Tooltip>
      </div>
    ),
  };

  return (
    <div style={{ height: 450, width: 950 }} className="rounded-xl border-gray-dark shadow-xl p-4 bg-white">
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <DataGrid
          rows={products}
          columns={[...productColumns.filter(col => col.field !== 'action'), actionColumn]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      )}
    </div>
  );
};

const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productName", headerName: "Product Name", width: 130 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "subcategory", headerName: "Sub Category", width: 120 },
  {
    field: "productType",
    headerName: "Product Type",
    width: 110,
    renderCell: (params) => (
      <div className={`px-2 py-1 rounded ${
        params.value === 'multi' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
      }`}>
        {params.value === 'multi' ? 'Multi Variant' : 'Single'}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 90,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 80,
  },
  {
    field: "discount",
    headerName: "Discount",
    type: "number",
    width: 80,
  },
  {
    field: "isStockAvailable",
    headerName: "Available",
    width: 90,
    renderCell: (params) => (
      <div className={params.value ? 'text-green-600' : 'text-red-600'}>
        {params.value ? 'Yes' : 'No'}
      </div>
    ),
  },
];

export default ProductDataTable;
