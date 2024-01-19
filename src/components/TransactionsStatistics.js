import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseURL = 'http://localhost:3000';
        const url = selectedMonth ? `${baseURL}/statistics?month=${selectedMonth}` : '/statistics';

        const response = await axios.get(url);

        setStatistics(response.data);
      } catch (error) {
        console.error(error);
        setError('Error fetching statistics. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <label className="block mb-4 text-lg font-semibold text-gray-700">
        Select Month:
        <select
          className="mt-1 p-2 border rounded-md"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </label>

      {loading && <p className="text-blue-500">Loading statistics...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {Object.keys(statistics).length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Statistics for {selectedMonth || 'All Months'}:
          </h3>
          <p className="text-green-600">Total Sale Amount: {statistics.totalSaleAmount}</p>
          <p className="text-blue-600">Total Sold Items: {statistics.totalSoldItems}</p>
          <p className="text-red-600">Total Not Sold Items: {statistics.totalNotSoldItems}</p>
        </div>
      ) : (
        <p className="text-gray-500">No statistics available.</p>
      )}
    </div>
  );
};

export default TransactionsStatistics;
