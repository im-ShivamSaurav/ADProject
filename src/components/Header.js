import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Kite from '../assets/kiteLogo.png';

const Header = () => {
    const navigate = useNavigate();
    const [nifty, setNifty] = useState(null);
    const [sensex, setSensex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:4000/api/v1/nifty_sensex');
            const data = await response.json();

            // Process and transform data for Nifty
            const niftyCurrentValue = data.body[1].regularMarketPrice;
            const niftyPreviousClose = data.body[1].regularMarketPreviousClose;
            const niftyChange = niftyCurrentValue - niftyPreviousClose;
            const niftyChangePercent = ((niftyChange / niftyPreviousClose) * 100).toFixed(1);
            const niftyForm = { currentValue: niftyCurrentValue, previousClose: niftyPreviousClose, change: niftyChange, percent: niftyChangePercent };

            // Process and transform data for Sensex
            const sensexCurrentValue = data.body[0].regularMarketPrice;
            const sensexPreviousClose = data.body[0].regularMarketPreviousClose;
            const sensexChange = sensexCurrentValue - sensexPreviousClose;
            const sensexChangePercent = ((sensexChange / sensexPreviousClose) * 100).toFixed(1);
            const sensexForm = { currentValue: sensexCurrentValue, previousClose: sensexPreviousClose, change: sensexChange, percent: sensexChangePercent };

            // Set state for Nifty and Sensex
            setNifty(niftyForm);
            setSensex(sensexForm);

            // Save to local storage with a timestamp
            const cache = {
                nifty: niftyForm,
                sensex: sensexForm,
                timestamp: Date.now(),
            };
            localStorage.setItem('marketData', JSON.stringify(cache));
        } catch (error) {
            setError('Error fetching market data.');
            console.error('Error fetching market data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load data (local storage or API)
    const loadData = useCallback(() => {
        const cache = localStorage.getItem('marketData');
        if (cache) {
            const parsedCache = JSON.parse(cache);

            // Check if data is fresh (e.g., less than 10 minutes old)
            const isFresh = Date.now() - parsedCache.timestamp < 60 * 60 * 1000;

            if (isFresh) {
                setNifty(parsedCache.nifty);
                setSensex(parsedCache.sensex);
                setLoading(false);
                return;
            }
        }

        // Fetch new data if no valid cache
        fetchData();
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

   
    const getChangeColor = (change) => {
        if (change > 0) return 'text-green-500'; 
        if (change < 0) return 'text-red-500';  
        return 'text-gray-700'; 
    };

    // Handle logout
    const handleLogout = () => {
        // Clear localStorage and reset state
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('marketData');
        localStorage.removeItem('stockData');
        localStorage.removeItem('lastFetchDate');
        setNifty(null);
        setSensex(null);
        setLoading(true);  // Optionally reset loading state

        // Redirect to home page
        navigate('/');
    };

    return (
        <div className="bg-white shadow-md flex items-center justify-between px-4 py-4 w-full h-auto">
            {/* Market Data */}
            <div className="w-[40%] h-full flex items-center justify-between border-r border-gray-200">
                <div className="flex space-x-6">
                    <p className="text-sm font-semibold text-gray-950">
                        NIFTY 50:{" "}
                        <span className={`${getChangeColor(nifty?.change)}`}>
                            {loading
                                ? "Loading..."
                                : nifty?.currentValue || "Error"}{" "}
                            <span>({nifty?.percent}%)</span>
                        </span>
                    </p>
                    <p className="text-sm font-semibold text-gray-950">
                        SENSEX:{" "}
                        <span className={`${getChangeColor(sensex?.change)}`}>
                            {loading
                                ? "Loading..."
                                : sensex?.currentValue || "Error"}{" "}
                            <span>({sensex?.percent}%)</span>
                        </span>
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm font-semibold">
                        {error}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="px-2 flex w-3/5 justify-between items-center">
                <img src={Kite} alt="kiteImg" width={30} height={30} />
                <div className="flex space-x-6">
                    <Link
                        to="/dashboard"
                        className="text-gray-700 font-medium hover:text-orange-500 transition"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/orders"
                        className="text-gray-700 font-medium hover:text-orange-500 transition"
                    >
                        Orders
                    </Link>
                    <Link
                        to="/holdings"
                        className="text-gray-700 font-medium hover:text-orange-500 transition"
                    >
                        Holdings
                    </Link>
                    <Link
                        to="/positions"
                        className="text-gray-700 font-medium hover:text-orange-500 transition"
                    >
                        Positions
                    </Link>
                    <Link
                        to="/funds"
                        className="text-gray-700 font-medium hover:text-orange-500 transition"
                    >
                        Funds
                    </Link>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-loginOrange text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Header;
