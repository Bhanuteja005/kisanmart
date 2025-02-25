import { ChevronDown, LogOut, Menu, Search, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStatusContext } from "../context/ContextProvider";

const Navbar = () => {
    const navigate = useNavigate();
  
  const { setActiveMenu } = useStatusContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const profileRef = useRef(null);
    const { logout } = useAuth();
  
const handleLogout = () => {
  logout();
  localStorage.removeItem("user");
  navigate("/");
};
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full border-b bg-[#00922F] shadow-sm">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            onClick={() => setActiveMenu(prev => !prev)}
          >
            <Menu className="h-6 w-6" />
          </button>


          {/* Mobile Search Toggle */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Menu - Updated with chevron */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-3 p-2 hover:bg-gray-50/10 rounded-lg transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="h-9 w-9 rounded-full bg-[#ffffff] flex items-center justify-center">
              <User className="h-5 w-5 text-[#00922F]" />
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-white">Admin</span>
              <span className="text-xs text-white">Super Admin</span>
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-white transition-transform ${
                isProfileOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {/* Profile Dropdown - Updated style */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-700">Admin Account</p>
                <p className="text-xs text-gray-500">admin@kisanmart.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile Settings
              </button>
              <div className="border-t my-1"></div>
              <button onClick={handleLogout}  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="p-4 border-t md:hidden bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
