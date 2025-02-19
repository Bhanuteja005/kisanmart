import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useStatusContext } from "../context/ContextProvider";
import { links } from "../data/links";
const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStatusContext();
  return (
    <div className="p-3 h-screen border-r border-gray-medium shadow-xl bg-green">
      <div className="flex justify-between">
        <Link
          to={"/"}
          onClick={() => {}}
          className="items-center flex gap-3 text-[#f6f6f6] mt-3 ml-8 font-extrabold text-xl"
        >
          <BsFillHandbagFill /> <span>KisanMart</span>
        </Link>
        <div
          onClick={() => setActiveMenu(false)}
          className="items-center flex mt-3 font-extrabold text-xl cursor-pointer p-3"
        >
          <button className="hover:bg-gray-light  text-white-medium transition ease-linear delay-50 p-4 rounded-full">
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <div>
        {links.map((link) => {
          return (
            <div className="p-1 mt-2" key={link.title}>
              {link.pageLink.map((item) => {
                return (
                  <Link
                    key={item.name}
                    to={`/${item.slugName}`}
                    className="hover:text-white text-gray-dark font-bold text-xl flex items-center justify-center space-x-3 p-3 mb-4 rounded hover:bg-blue-light cursor-pointer"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
