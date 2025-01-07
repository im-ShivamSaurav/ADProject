import React from "react";

const StockList = () => {
  const companies = [
    { name: "HDFCBANK BSE", change: "", price: "" },
    { name: "INFY", change: "", price: "" },
    { name: "TCS BSE", change: "", price: "" },
    { name: "ONGC", change: "", price: "" },
    { name: "GOLDBEES", change: "", price: "" },
  ];

  return (
    <div className="p-6 space-y-4 w-2/5 border-r border-gray-200 h-full shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search e.g.: INFY, nifty fut, index fund, etc"
          className="w-full px-4 py-2 border rounded-md text-sm border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Company Data Table */}
      <div className="divide-y divide-gray-200">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 text-sm"
          >
            <span className="font-medium text-gray-800">{company.name}</span>
            <span
              className={`font-medium ${
                company.change.includes("+")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {company.change}
            </span>
            <span className="font-medium text-gray-800">{company.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;
