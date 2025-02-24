import React, { useState } from "react";
import { MdOutlineQueryStats, MdTrendingUp } from "react-icons/md";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", sales: 2400, orders: 24 },
  { name: "Tue", sales: 1398, orders: 13 },
  { name: "Wed", sales: 3800, orders: 38 },
  { name: "Thu", sales: 3908, orders: 39 },
  { name: "Fri", sales: 4800, orders: 48 },
  { name: "Sat", sales: 3800, orders: 38 },
  { name: "Sun", sales: 4300, orders: 43 },
];

const timeRanges = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

const SalesChart = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800">Sales Analytics</h3>
          <p className="text-sm text-gray-500">Monitor your sales performance</p>
        </div>
        
        {/* Mobile Dropdown for Time Range */}
        <div className="sm:hidden">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Time Range Buttons */}
        <div className="hidden sm:flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedRange === range.value
                  ? "bg-[#00922F] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MdTrendingUp className="text-[#00922F] text-xl" />
              <span className="text-sm font-medium text-gray-600">Total Sales</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-900">₹{totalSales.toLocaleString()}</span>
              <span className="ml-2 text-sm text-green-600">+12.5%</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MdOutlineQueryStats className="text-[#00922F] text-xl" />
              <span className="text-sm font-medium text-gray-600">Total Orders</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-900">{totalOrders}</span>
              <span className="ml-2 text-sm text-green-600">+8.2%</span>
            </div>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00922F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00922F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-white p-3 shadow-lg">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Sales</span>
                            <span className="font-bold text-gray-900">
                              ₹{payload[0].value.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Orders</span>
                            <span className="font-bold text-gray-900">
                              {payload[0].payload.orders}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#00922F"
                strokeWidth={2}
                fill="url(#salesGradient)"
                dot={{ stroke: '#00922F', strokeWidth: 2, fill: '#ffffff', r: 4 }}
                activeDot={{ stroke: '#00922F', strokeWidth: 2, fill: '#ffffff', r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;