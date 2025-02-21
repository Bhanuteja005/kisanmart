import React from "react";
import CustomerDataTable from "../components/tables/CustomerDataTable";
import { useStatusContext } from "../context/ContextProvider";

const Customers = () => {
  const { activeMenu } = useStatusContext();
  return (
    <div className={`${activeMenu ? "ml-72" : "w-full"} p-4`}>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-black">Customers</h2>
        </div>
        <CustomerDataTable />
      </div>
    </div>
  );
};

export default Customers;
