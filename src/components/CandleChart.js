import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CandleChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/chartData?region=IN&symbol=${symbol}&interval=5m&range=5Y&comparisons=%5EGDAXI,%5EFCHI`
        );
        const data = await response.json();
        
       
      
        

        // Parse the data to extract timestamps, open, high, low, and close values
        const result = data.chart.result[0];
        const timestamps = result.timestamp.map((ts) => 
          new Date(ts * 1000).toLocaleString("en-GB", { timeZone: result.meta.timezone })
        );
        const quotes = result.indicators.quote[0];
        const { open, high, low, close } = quotes;

        setChartData({ timestamps, open, high, low, close });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [symbol]); // Re-fetch when symbol changes

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
      <Plot
      data={[
        {
          x: chartData.timestamps, // Timestamps for X-axis
          open: chartData.open,    // Opening prices
          high: chartData.high,    // High prices
          low: chartData.low,      // Low prices
          close: chartData.close,  // Closing prices
          type: 'candlestick',     // Chart type
          increasing: { line: { color: 'green' } },
          decreasing: { line: { color: 'red' } },
        },
      ]}
      layout={{
        title: `Candlestick Chart for ${symbol}`,
        xaxis: { title: 'Time', rangeslider: { visible: false } , visible: false},
        yaxis: { title: 'Price' },
      }}
      style={{ width: '100%', height: '600px' }}
    />
  );
};

export default CandleChart;
