import React from "react";
import CustomersTable from "../components/tables/CustomerDataTable";

const Customers = () => {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-black">Customers</h2>
      </div>
      <CustomersTable />
    </div>
  );
};

export default Customers;
