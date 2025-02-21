import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { GrFormView } from "react-icons/gr";
import { Link } from "react-router-dom";

const OrderDataTable = () => {
  return (
    <div className="w-full p-6 rounded-lg shadow-lg bg-white">
      <DataGrid
        rows={orderRow}
        columns={orderCol.map(col => ({
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

export default OrderDataTable;

const orderRow = [
  {
    id: "1",
    orderTime: "may 9 2022",
    deliveryAddress: "new york",
    phoneNumber: "9999999999",
    paymentMethod: "COD",
    orderAmount: "$4343",
    status: "Pending",
    action: {
      view: <GrFormView />,
    },
  },
  {
    id: "2",
    orderTime: "may 9 2022",
    deliveryAddress: "new york",
    phoneNumber: "9999999999",
    paymentMethod: "COD",
    orderAmount: "$4343",
    status: "Approved",
    action: {
      view: <GrFormView />,
    },
  },
  {
    id: "3",
    orderTime: "may 9 2022",
    deliveryAddress: "new york",
    phoneNumber: "9999999999",
    paymentMethod: "COD",
    orderAmount: "$4343",
    status: "Rejected",
    action: {
      view: <GrFormView />,
    },
  },
  {
    id: "4",
    orderTime: "may 9 2022",
    deliveryAddress: "new york",
    phoneNumber: "9999999999",
    paymentMethod: "COD",
    orderAmount: "$4343",
    status: "Pending",
    action: {
      view: <GrFormView />,
    },
  },
];

const orderCol = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "orderTime", headerName: "Order Time", width: 130 },
  { field: "deliveryAddress", headerName: "Delivery Address", width: 130 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "number",
    width: 90,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    sortable: false,
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
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
          <Tooltip title="View" placement="right" arrow>
            <IconButton>
              <Link to={"/order-details"}>{params.row.action.view}</Link>
            </IconButton>
          </Tooltip>
        </div>
      );
    },
  },
];
