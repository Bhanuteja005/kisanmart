import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { FiEdit2 } from "react-icons/fi";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const CustomerDataTable = () => {
  return (
    <div className="w-full p-6 rounded-lg shadow-lg bg-white">
      <DataGrid
        rows={customerRow}
        columns={customerCol.map(col => ({
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

export default CustomerDataTable;

const customerRow = [
  {
    id: 1,
    username: "Snow",
    status: "passive",
    age: 35,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 2,
    username: "Lannister",
    status: "active",
    age: 42,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 3,
    username: "Lannister",
    status: "active",
    age: 45,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 4,
    username: "Stark",
    status: "passive",
    age: 16,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 5,
    username: "Targaryen",
    status: "active",
    age: null,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 6,
    username: "Melisandre",
    status: null,
    age: 150,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 7,
    username: "Clifford",
    status: "passive",
    age: 44,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 8,
    username: "Frances",
    status: "passive",
    age: 36,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
  {
    id: 9,
    username: "Roxie",
    status: "active",
    age: 65,
    email: "1sonw@gmail.com",
    action: {
      edit: <FiEdit2 />,
      delete: <MdDeleteOutline />,
      view: <GrFormView />,
    },
  },
];

const customerCol = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cursor-pointer">
          <Tooltip title="View" placement="left" arrow>
            <IconButton>
              <Link to={"/customer-details"}>{params.row.action.view}</Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton>
              <Link to={"/edit-customer"}>{params.row.action.edit}</Link>
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
