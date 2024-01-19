import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseURL = "http://localhost:3000";

        const url = `${baseURL}/list-transactions?month=${selectedMonth}&search=${searchText}&page=${currentPage}`;

        const response = await axios.get(url);
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
        setError("Error fetching transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container mx-auto my-8 p-4 bg-white rounded shadow">
      <label className="mb-4 block text-lg font-semibold">
        Select Month:
        <select
          className="ml-2 p-2 border rounded"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </label>

      <input
        type="text"
        placeholder="Search transactions..."
        value={searchText}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {transactions.length > 0 ? (
        <div>
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-2 border">{transaction.id}</td>
                  <td className="p-2 border">{transaction.title}</td>
                  <td className="p-2 border">{transaction.price}</td>
                  <td className="p-2 border">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsTable;
