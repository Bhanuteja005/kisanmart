import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import { FiLogOut, FiShoppingCart, FiUsers } from "react-icons/fi";
import { MdCategory, MdDashboard, MdOutlineInventory, MdOutlinePeople, MdOutlineStorefront } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStatusContext } from "../context/ContextProvider";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
  { name: "Staff Management", path: "/dashboard/staff", icon: <FiUsers /> },
  { name: "Products", path: "/dashboard/products", icon: <MdOutlineInventory /> },
  { name: "Dealers", path: "/dashboard/dealers", icon: <MdOutlineStorefront /> },
  { name: "Customers", path: "/dashboard/customers", icon: <MdOutlinePeople /> },
  { name: "Orders", path: "/dashboard/orders", icon: <FiShoppingCart /> },
  { name: "Categories", path: "/dashboard/categories", icon: <MdCategory /> },
];

const Sidebar = () => {
  const { setActiveMenu } = useStatusContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className=" h-screen bg-[#DFF1E6] border-r border-gray-medium shadow-xl relative">
      <div className="bg-[#00922F] p-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="items-center flex gap-3 text-white font-extrabold text-xl">
            <BsFillHandbagFill /> 
            <span>KisanMart Tools</span>
          </Link>
          <button 
            onClick={() => setActiveMenu(false)} 
            className="p-3 hover:bg-[#007d28] text-white rounded-full transition-colors"
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <div className="p-3">
      <div className="mt-6">
      <div className="mt-6">
        {links.map((item) => {
          const isActive = location.pathname === item.path; // **Exact match only**

          return (
            <Link
              to={item.path}
              key={item.name}
              className="relative flex items-center gap-4 p-3 pl-6 transition-colors mb-2 text-[#00922F] hover:text-[#007A24]"
            >
              {/* Green highlight on left when active */}
              {isActive && <div className="absolute left-0 top-0 h-full w-2 bg-[#00922F] rounded-r-lg"></div>}
              <span className={`text-xl ${isActive ? "text-[#00922F] font-bold" : "text-[#00922F]"}`}>{item.icon}</span>
              <span className={`text-lg ${isActive ? "font-bold" : ""}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
      </div>
      </div>
      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 w-full">
        <button onClick={handleLogout} className="flex items-center gap-4 text-[#00922F] text-lg font-semibold hover:text-[#007A24]">
          <FiLogOut className="text-xl" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
