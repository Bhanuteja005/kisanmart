import { BoxIcon, Users, Wallet } from "lucide-react";
import React, { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false); // Add this state

  return (
    <div className="flex">
      <Sidebar onHoverChange={setIsHovered} /> {/* Pass hover state handler */}
      <div className={`w-full min-h-screen transition-all duration-300 ease-in-out relative z-0
        ${activeMenu || isHovered ? "md:ml-72" : "md:ml-20"}`}> {/* Removed hover class */}
        <div className="fixed w-full bg-white md:static">
          <Navbar />
        </div>
        
        <div className="p-4">
          {isDashboardHome ? (
            <main className="flex-1 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
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