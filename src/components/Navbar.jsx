import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSettings, FiShoppingBag } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useStatusContext } from "../context/ContextProvider";

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked } =
    useStatusContext();
  const [resize, setResize] = useState(undefined);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setResize(window.innerWidth);
    });
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (resize <= 950) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    };
    handleResize();
  }, [resize, setActiveMenu]);
  
  return (
    <header className="relative bg-[#00922F]">
      <nav className="flex justify-between p-2 items-center">
        <div
          className="text-xl cursor-pointer"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {!activeMenu ? (
            <div className="flex justify-between items-center">
              <Link to="/dashboard" className="items-center flex gap-3 text-[#ffffff] mt-3 ml-4 font-extrabold text-xl">
                <span>KisanMart Tools</span>
              </Link>
              <button className="hover:bg-[#007D28] text-white transition ease-linear delay-50 p-4 rounded-full">
                <AiOutlineMenu />
              </button>
            </div>
          ) : null}
        </div>
        <div
          className="flex justify-between hover:bg-[#007D28] transition ease-linear delay-50 p-2 items-center cursor-pointer rounded-lg"
          onClick={() =>
            setIsClicked({ ...isClicked, userProfile: !isClicked.userProfile })
          }
        >
          <div className="w-[2.5rem] mr-3">
            <img
              className="w-full  rounded-full"
              src="/default.png"
              alt="default"
            />
          </div>
          <div className="text-white font-bold text-xl cursor-pointer">
            Kisanmart
          </div>
          <div className="text-lg text-white">
            <IoIosArrowDown />
          </div>
        </div>
      </nav>
      {isClicked.userProfile ? <NavMenu /> : null}
    </header>
  );
};

const NavMenu = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add any logout logic here (clear tokens, user data etc.)
    localStorage.removeItem('user'); // Remove user data if any
    navigate('/'); // Redirect to onboarding screen
  };
  return (
    <div className="z-10 rounded-lg bg-white border-gray-light border absolute w-[14rem] shadow-lg right-0 mr-8 mt-4">
      <div className="hover:bg-gray-light flex items-center gap-2 cursor-pointer border-b border-gray-medium text-lg w-full bg-slate-300 py-2 px-8">
        <FiShoppingBag className="text-2xl" />
        <span className="text-gray-dark font-bold text-xl cursor-pointer">
          <Link to="/">eCommerce</Link>
        </span>
      </div>
      <div className="hover:bg-gray-light flex items-center gap-2 cursor-pointer border-b border-gray-medium text-lg w-full bg-slate-300 py-2 px-8">
        <FiSettings className="text-2xl" />
        <span className="text-gray-dark font-bold text-xl cursor-pointer">
          <Link to="/edit-profile">Edit Profile</Link>
        </span>
      </div>
      <div 
        onClick={handleSignOut}
        className="hover:bg-gray-light flex items-center gap-2 cursor-pointer text-lg w-full bg-slate-300 py-2 px-8"
      >
        <HiOutlineLogout className="text-2xl" />
        <span className="text-gray-dark font-bold text-xl cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Navbar;
