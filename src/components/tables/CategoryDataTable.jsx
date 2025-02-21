import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryDataTable = () => {
  return (
    <div className="w-full p-6 rounded-lg shadow-lg">
      <DataGrid
        rows={categoryRow}
        columns={categoryCol.map(col => ({
          ...col,
          flex: 1,
          minWidth: col.field === 'id' ? 70 : 120
        }))}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
        autoHeight
        className="border-none"
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
    </div>
  );
};

export default CategoryDataTable;

const categoryRow = [
  {
    id: 1,
    categoryName: "Drinks",
    type: "Grocery",
    published: "false",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
    },
  },

  {
    id: 2,
    categoryName: "Drinks",
    type: "Grocery",
    published: "false",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
    },
  },

  {
    id: 3,
    categoryName: "Drinks",
    type: "Grocery",
    published: "false",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
    },
  },
];

const categoryCol = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "categoryName", headerName: "Category Name", width: 130 },
  { field: "type", headerName: "Type", width: 100 },
  {
    field: "published",
    headerName: "Published",
    width: 90,
  },

  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cursor-pointer">
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton>
              <Link to={"/edit-category/43"}>{params.row.action.edit}</Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton>{params.row.action.delete}</IconButton>
          </Tooltip>
        </div>
      );
    },
  },
];
