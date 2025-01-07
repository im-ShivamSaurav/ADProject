import React from 'react';
import Header from '../components/Header';
import StockList from '../components/StockList';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header className="w-full" />

      {/* Content Below Header */}
      <div className="flex flex-grow">
        <StockList className="w-2/5" />
        {/* You can add additional content here if needed */}
        <div className="w-3/5 p-4"> {/* Placeholder for other content */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
