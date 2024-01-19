import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TransactionsBarChart = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseURL = 'http://localhost:3000';
        const url = selectedMonth
          ? `${baseURL}/bar-chart?month=${selectedMonth}`
          : `${baseURL}/bar-chart`;

        const response = await axios.get(url);

        setBarChartData(response.data.barChartData);
      } catch (error) {
        console.error(error);
        setError('Error fetching bar chart data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <label className="block mb-4 text-lg font-semibold text-gray-700">
        Select Month:
        <select
          className="mt-1 p-2 border rounded-md"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </label>

      {loading && <p className="text-blue-500">Loading bar chart data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {barChartData.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Bar Chart for {selectedMonth || 'All Months'}:
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={barChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priceRange" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="itemCount" fill="#4299e1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500">No bar chart data available.</p>
      )}
    </div>
  );
};

export default TransactionsBarChart;
