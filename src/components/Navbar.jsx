import { Menu, Search, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useStatusContext } from "../context/ContextProvider";

const Navbar = () => {
  const { setActiveMenu } = useStatusContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const profileRef = useRef(null);

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
    <div className="flex flex-col w-full border-b bg-white">
      {/* Main Navbar */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setActiveMenu(prev => !prev)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-[#00922F] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="hidden md:block font-medium">Admin</span>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Settings</button>
              <div className="border-t my-1"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="p-4 border-t md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
