import { BoxIcon, Users, Wallet, TrendingUp } from "lucide-react";
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
  const isDashboardHome = location.pathname === "/dashboard";

  // Search States
  const [searchOrders, setSearchOrders] = useState("");
  const [searchDealers, setSearchDealers] = useState("");

  return (
    <div className="flex">
      {/* Sidebar */}
      {activeMenu ? (
        <div className="w-72 h-screen fixed z-10">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">sidebar</div>
      )}

      {/* Main Content */}
      <div className={`w-full ${activeMenu ? "md:ml-72" : "flex-1"} overflow-auto`}>
        <div className="fixed w-full bg-white md:static">
          <Navbar />
        </div>

        <div className="p-4">
          {isDashboardHome ? (
            <main className="flex-1 space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-4">
                <StatsCard
                  title="TODAY'S ORDERS"
                  value="45"
                  change={{ value: 0.7, trend: "up", label: "from yesterday" }}
                  icon={<BoxIcon className="h-4 w-4 text-green-600" />}
                  action={{ label: "All Orders", href: "/dashboard/orders" }}
                />
                <StatsCard
                  title="PENDING DEALERS"
                  value="12"
                  change={{ value: 0.3, trend: "up", label: "from yesterday" }}
                  icon={<Users className="h-4 w-4 text-green-600" />}
                  action={{ label: "All Dealers", href: "/dashboard/dealers" }}
                />
                <StatsCard
                  title="SALES PERFORMANCE"
                  value="₹3,200"
                  change={{ value: 0.5, trend: "down", label: "from yesterday" }}
                  icon={<Wallet className="h-4 w-4 text-green-600" />}
                  action={{ label: "Sales Data", href: "#" }}
                />
                <StatsCard
                  title="BEST SELLING PRODUCTS"
                  value="Product A"
                  change={{ value: 1.2, trend: "up", label: "Top seller" }}
                  icon={<TrendingUp className="h-4 w-4 text-green-600" />}
                  action={{ label: "View Products", href: "#" }}
                />
              </div>

              {/* Search Inputs */}
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Search Orders..."
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  value={searchOrders}
                  onChange={(e) => setSearchOrders(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Search Dealers..."
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  value={searchDealers}
                  onChange={(e) => setSearchDealers(e.target.value)}
                />
              </div>

              {/* Charts & Tables */}
              <div className="grid gap-6 md:grid-cols-2">
                <SalesChart />
                <ProductsTable />
              </div>
              <OrdersTable searchTerm={searchOrders} />
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
