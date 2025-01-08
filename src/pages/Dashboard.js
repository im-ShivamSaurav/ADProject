import React, { useState } from 'react';
import Header from '../components/Header';
import StockList from '../components/StockList';
import CandleChart from '../components/CandleChart';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("INFY.NS"); // Default symbol for the first stock
  const selectedStock = useSelector((state) => state.stock.selectedStock);
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header className="w-full" />

      {/* Content Below Header */}
      <div className="flex flex-grow">
        <StockList
          className="w-2/5"
          onSelectStock={setSelectedStockSymbol} // Pass callback to update the selected stock symbol
        />
        
        <div className="w-3/5 p-4">
          {/* <h1>Candlestick Chart</h1> */}
          <div>
            <CandleChart symbol={selectedStock.symbol} /> {/* Pass the selected symbol to the chart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
