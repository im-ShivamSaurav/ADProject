import React, { useEffect, useState, useCallback, useMemo } from "react";

const StockList = () => {
  // Memoizing the companies array
  const companies = useMemo(() => [
    "HDFCBANK BSE", 
    "INFY", 
    "TCS BSE", 
    "ONGC", 
    "GOLDBEES"
  ], []);

  const [stockData, setStockData] = useState([]);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/topcompanies");
      const data = await response.json();

      const currentDate = new Date().toISOString().split("T")[0];
      localStorage.setItem("stockData", JSON.stringify(data));
      localStorage.setItem("lastFetchDate", currentDate);

      const mappedData = companies.map((name, index) => ({
        name,
        currentMarketPrice: data.currentMarketPrices[index],
        percentChange: data.percentChanges[index],
      }));
      setStockData(mappedData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }, [companies]);

  useEffect(() => {
    const storedData = localStorage.getItem("stockData");
    const lastFetchDate = localStorage.getItem("lastFetchDate");
    const currentDate = new Date().toISOString().split("T")[0];

    if (storedData && lastFetchDate === currentDate) {
      const parsedData = JSON.parse(storedData);
      const mappedData = companies.map((name, index) => ({
        name,
        currentMarketPrice: parsedData.currentMarketPrices[index],
        percentChange: parsedData.percentChanges[index],
      }));
      setStockData(mappedData);
    } else {
      fetchData();
    }
  }, [companies, fetchData]);

  return (
    <div className="p-6 space-y-4 w-2/5 border-r border-gray-200 h-full shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
      <div>
        <input
          type="text"
          placeholder="Search e.g.: INFY, nifty fut, index fund, etc"
          className="w-full px-4 py-2 border rounded-md text-sm border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="divide-y divide-gray-200">
        {stockData.map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 text-sm"
          >
            <span className="font-medium w-1/2 text-gray-800">{stock.name}</span>
            <span
              className={`font-medium w-1/4 text-center ${
                parseFloat(stock.percentChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stock.percentChange}%
            </span>
            <span className="font-medium text-gray-800 w-1/4 text-right">
              ₹{stock.currentMarketPrice.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;
