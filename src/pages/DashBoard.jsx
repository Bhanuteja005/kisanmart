import { BoxIcon, Users, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components";
import MobileHeader from '../components/MobileHeader';
import OrdersTable from "../components/tables/orders-table";
import ProductsTable from "../components/tables/products-table";
import SalesChart from "../components/tables/sales-chart";
import StatsCard from "../components/tables/stats-card";
import { useStatusContext } from "../context/ContextProvider";

const DashBoard = () => {
  const { activeMenu } = useStatusContext();
  const location = useLocation();
  const isDashboardHome = location.pathname === '/dashboard';
  const [isHovered, setIsHovered] = useState(false); // Add this state

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar onHoverChange={setIsHovered} />
      
      <div className={`flex-1 transition-all duration-300 ${
        activeMenu || isHovered ? "lg:ml-72" : "lg:ml-20"
      }`}>
        <MobileHeader title={isDashboardHome ? "Dashboard" : ""} />
        
        <div className="p-4 lg:p-6">
          {isDashboardHome ? (
            <main className="space-y-6">
              {/* Stats Cards - Make responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <StatsCard
                  title="Total Sales"
                  value="₹68,250"
                  change={{ value: 9.5, trend: "up", label: "vs last month" }}
                  icon={<BoxIcon className="h-5 w-5" />}
                />
                <StatsCard
                  title="Active Dealers"
                  value="245"
                  change={{ value: 12.3, trend: "up", label: "new dealers" }}
                  icon={<Users className="h-5 w-5" />}
                />
                <StatsCard
                  title="Monthly Revenue"
                  value="₹32,580"
                  change={{ value: 3.2, trend: "down", label: "vs last month" }}
                  icon={<Wallet className="h-5 w-5" />}
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <SalesChart />
                <ProductsTable />
              </div>

              {/* Orders Table */}
              <div className="overflow-hidden">
                <OrdersTable />
              </div>
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