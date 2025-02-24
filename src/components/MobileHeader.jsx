import { Menu } from 'lucide-react';
import React from 'react';
import { useStatusContext } from "../context/ContextProvider";

const MobileHeader = ({ title }) => {
  const { setActiveMenu } = useStatusContext();

  return (
    <div className="lg:hidden flex items-center gap-4 p-4 bg-white border-b sticky top-0 z-30">
      <button
        onClick={() => setActiveMenu(true)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    </div>
  );
};

export default MobileHeader;
