import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const StatsCard = ({ title, value, change, icon }) => {
  const isPositive = change?.trend === "up";

  return (
    <div className="rounded-lg bg-white p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#00922F]/10">
              <div className="text-[#00922F]">
                {React.cloneElement(icon, { size: 24 })} {/* Increased icon size */}
              </div>
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        {change && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}>
              <div className={`p-1 rounded-full ${
                isPositive ? "bg-green-100" : "bg-red-100"
              }`}>
                {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </div>
              <span className="font-semibold">{change.value}%</span>
            </div>
            <span className="text-gray-500 text-sm">{change.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;