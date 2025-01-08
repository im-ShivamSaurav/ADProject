import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock } from "../utils/stockSlice"; // Import action
import CandleChart from "../components/CandleChart"; // Importing CandleChart component

const StockList = () => {
  // Memoizing the companies array
  const companies = useMemo(
    () => [
      { name: "HDFCBANK BSE", symbol: "HDFCBANK.NS" },
      { name: "INFY", symbol: "INFY.NS" },
      { name: "TCS BSE", symbol: "TCS.NS" },
      { name: "ONGC", symbol: "ONGC.NS" },
      { name: "GOLDBEES", symbol: "GOLDBEES.NS" },
    ],
    []
  );

  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stock.selectedStock); // Retrieve selected stock from Redux

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Function to fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await fetch("http://localhost:4000/api/v1/topcompanies");
      const data = await response.json();

      const currentDate = new Date().toISOString().split("T")[0];
      localStorage.setItem("stockData", JSON.stringify(data));
      localStorage.setItem("lastFetchDate", currentDate);

      const mappedData = companies.map((company, index) => ({
        name: company.name,
        symbol: company.symbol,
        currentMarketPrice: data.currentMarketPrices[index],
        percentChange: data.percentChanges[index],
      }));
      setStockData(mappedData);

      if (!selectedStock) {
        dispatch(setSelectedStock(mappedData[0])); // Set the first stock as default if none is selected
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch completes
    }
  }, [companies, dispatch, selectedStock]);

  useEffect(() => {
    const storedData = localStorage.getItem("stockData");
    const lastFetchDate = localStorage.getItem("lastFetchDate");
    const currentDate = new Date().toISOString().split("T")[0];

    if (storedData && lastFetchDate === currentDate) {
      const parsedData = JSON.parse(storedData);
      const mappedData = companies.map((company, index) => ({
        name: company.name,
        symbol: company.symbol,
        currentMarketPrice: parsedData.currentMarketPrices[index],
        percentChange: parsedData.percentChanges[index],
      }));
      setStockData(mappedData);
      setLoading(false); // Data is loaded from localStorage

      if (!selectedStock) {
        dispatch(setSelectedStock(mappedData[0])); // Set the first stock as default if none is selected
      }
    } else {
      fetchData();
    }
  }, [companies, fetchData, dispatch, selectedStock]);

  return (
    <div className="p-6 space-y-4 w-2/5 border-r border-gray-200 h-full shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
      <div>
        <input
          type="text"
          placeholder="Search e.g.: INFY, nifty fut, index fund, etc"
          className="w-full px-4 py-2 border rounded-md text-sm border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Display spinner while loading */}
      {loading ? (
        <div role="status" className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717
            C44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {stockData.map((stock, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-3 text-sm cursor-pointer m-1 p-2 rounded-md ${
                selectedStock?.symbol === stock.symbol ? "bg-[#ff572289]" : ""
              }`}
              onClick={() => dispatch(setSelectedStock(stock))} // Dispatch action to set selected stock
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
      )}
    </div>
  );
};

export default StockList;
