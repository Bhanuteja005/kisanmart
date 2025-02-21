import React from "react";
import OrderDataTable from "../components/tables/OrderDataTable";
import { useStatusContext } from "../context/ContextProvider";

const Orders = () => {
  const { activeMenu } = useStatusContext();
  return (
    <div className={`${activeMenu ? "ml-72" : "w-full"} p-4`}>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-black">Orders</h2>
        </div>
        <OrderDataTable />
      </div>
    </div>
  );
};

export default Orders;
