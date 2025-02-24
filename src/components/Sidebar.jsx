import React, { useState } from "react";
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
  { name: "Dealers", path: "/dashboard/dealers", icon: <MdOutlineStorefront /> }, // Make sure this matches
  { name: "Customers", path: "/dashboard/customers", icon: <MdOutlinePeople /> },
  { name: "Orders", path: "/dashboard/orders", icon: <FiShoppingCart /> },
  { name: "Categories", path: "/dashboard/categories", icon: <MdCategory /> },
];

const Sidebar = ({ onHoverChange }) => {
  const { activeMenu, setActiveMenu } = useStatusContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div 
      className={`h-screen bg-[#DFF1E6] border-r border-gray-medium shadow-xl fixed z-50 transition-all duration-300 ease-in-out
        ${activeMenu ? "w-72" : "w-20 hover:w-72"}`} // Modified hover logic
      onMouseEnter={() => {
        !activeMenu && setIsHovered(true);
        onHoverChange(true); // Notify parent about hover
      }}
      onMouseLeave={() => {
        !activeMenu && setIsHovered(false);
        onHoverChange(false); // Notify parent about hover end
      }}
    >
      <div className={`bg-[#00922F] transition-all duration-300 ${activeMenu || isHovered ? "p-4" : "py-5 px-4"}`}>
        <div className="flex justify-between items-center">
          {(activeMenu || isHovered) ? (
            <>
              <Link to="/dashboard" className="items-center flex gap-3 text-white font-extrabold text-xl">
                <BsFillHandbagFill /> 
                <span>KisanMart Tools</span>
              </Link>
              <button 
                onClick={() => setActiveMenu(!activeMenu)} 
                className="p-3 hover:bg-[#007d28] text-white rounded-full transition-colors"
              >
                <AiOutlineMenu />
              </button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <BsFillHandbagFill className="text-white text-3xl" /> {/* Increased icon size */}
            </div>
          )}
        </div>
      </div>

      <div className="p-3">
        <div className="mt-6">
          {links.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={item.name}
                className="relative flex items-center gap-4 p-3 pl-6 transition-colors mb-2 text-[#00922F] hover:text-[#007A24] whitespace-nowrap"
              >
                {isActive && <div className="absolute left-0 top-0 h-full w-2 bg-[#00922F] rounded-r-lg"></div>}
                <span className={`text-xl ${isActive ? "text-[#00922F] font-bold" : "text-[#00922F]"}`}>
                  {item.icon}
                </span>
                <span className={`text-lg ${isActive ? "font-bold" : ""} 
                  ${!activeMenu && !isHovered ? "hidden" : "block"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-6 left-4 w-full pr-4">
        <button 
          onClick={handleLogout} 
          className={`flex items-center gap-4 text-[#00922F] text-lg font-semibold hover:text-[#007A24] 
            ${!activeMenu && !isHovered ? "justify-center" : ""}`}
        >
          <FiLogOut className="text-xl" />
          <span className={!activeMenu && !isHovered ? "hidden" : "block"}>
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
