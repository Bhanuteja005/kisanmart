import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { FiChevronDown, FiChevronRight, FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const CategoryDataTable = ({ categories = [], subcategories = [], onAction, loading }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {params.row.type === 'category' && (
            <button 
              onClick={() => toggleExpand(params.row._id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {expandedCategories.has(params.row._id) ? 
                <FiChevronDown className="w-4 h-4" /> : 
                <FiChevronRight className="w-4 h-4" />
              }
            </button>
          )}
          {params.row.type === 'subcategory' && <div className="w-4 ml-6" />}
          <div className="flex items-center gap-3">
            {params.row.imageUrl && (
              <img 
                src={params.row.imageUrl} 
                alt={params.value}
                className="w-8 h-8 rounded object-cover"
              />
            )}
            <span className={params.row.type === 'subcategory' ? 'text-gray-600' : 'font-medium'}>
              {params.value}
            </span>
          </div>
        </div>
      )
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {params.value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 160,
      renderCell: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => onAction('edit', params.row)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => onAction('delete', params.row)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <MdDeleteOutline />
          </button>
        </div>
      )
    }
  ];

  // Prepare rows with categories and their subcategories
  const rows = categories.reduce((acc, category) => {
    acc.push({
      ...category,
      type: 'category',
      id: category._id
    });
    
    if (expandedCategories.has(category._id)) {
      const categorySubcategories = subcategories.filter(
        sub => sub.categoryId === category._id
      );
      
      categorySubcategories.forEach(sub => {
        acc.push({
          ...sub,
          type: 'subcategory',
          id: `${category._id}-${sub._id}`
        });
      });
    }
    
    return acc;
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowClassName={(params) => 
          params.row.type === 'subcategory' ? 'bg-gray-50' : ''
        }
      />
    </div>
  );
};

export default CategoryDataTable;
