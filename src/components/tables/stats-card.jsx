import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const StatsCard = ({ title, value, change, icon, action }) => {
  const isPositive = change?.trend === "up";

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon && <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {change && (
          <div className={`ml-2 flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span>{change.value}%</span>
            <span className="ml-1 text-gray-500">{change.label}</span>
          </div>
        )}
      </div>
      {action && (
        <div className="mt-4 flex items-center justify-between">
          <a href={action.href} className="text-sm font-medium text-green-600 hover:underline">
            {action.label}
          </a>
          <span className="text-green-600">→</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;