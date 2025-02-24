import React from 'react';
import MobileHeader from './MobileHeader';

const PageLayout = ({ title, actionButton, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={title} />
      
      <div className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-extrabold text-gray-800 hidden lg:block">{title}</h2>
          {actionButton}
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
