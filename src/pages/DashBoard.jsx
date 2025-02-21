import { BoxIcon, Users, Wallet } from "lucide-react";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import OrdersTable from "../components/tables/orders-table";
import ProductsTable from "../components/tables/products-table";
import SalesChart from "../components/tables/sales-chart";
import StatsCard from "../components/tables/stats-card";
import { useStatusContext } from "../context/ContextProvider";

const DashBoard = () => {
  const { activeMenu } = useStatusContext();
  const location = useLocation();
  const isDashboardHome = location.pathname === '/dashboard';

  return (
    <div className="flex">
      {activeMenu ? (
        <div className="w-72 h-screen fixed z-10">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">sidebar</div>
      )}
      <div className={`w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}>
        <div className="fixed w-full bg-white md:static">
          <Navbar />
        </div>
        
        <div className="p-4">
          {isDashboardHome ? (
            <main className="flex-1 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <StatsCard
                  title="TODAY'S ORDERS"
                  value="12"
                  change={{ value: 0.7, trend: "up", label: "from yesterday" }}
                  icon={<BoxIcon className="h-4 w-4 text-green-600" />}
                  action={{ label: "All Orders", href: "/dashboard/orders" }}
                />
                <StatsCard
                  title="PENDING DEALERS"
                  value="4"
                  change={{ value: 0.3, trend: "up", label: "from yesterday" }}
                  icon={<Users className="h-4 w-4 text-green-600" />}
                  action={{ label: "All Dealers", href: "/dashboard/dealers" }}
                />
                <StatsCard
                  title="REVENUE"
                  value="₹3,200"
                  change={{ value: 0.5, trend: "down", label: "from yesterday" }}
                  icon={<Wallet className="h-4 w-4 text-green-600" />}
                  action={{ label: "Sales Data", href: "#" }}
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <SalesChart />
                <ProductsTable />
              </div>
              <OrdersTable />
            </main>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;