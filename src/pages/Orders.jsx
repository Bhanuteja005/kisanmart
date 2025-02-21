import React from "react";
import OrdersTable from "../components/tables/OrderDataTable";

const Orders = () => {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-black">Orders</h2>
      </div>
      <OrdersTable />
    </div>
  );
};

export default Orders;
