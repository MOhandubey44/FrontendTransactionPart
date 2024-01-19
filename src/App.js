import React from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';

function App() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Transactions Dashboard</h1>

      {/* Transactions Table Component */}
      <div className="mb-8">
        <TransactionsTable />
      </div>

      {/* Transactions Statistics Component */}
      <div className="mb-8">
        <TransactionsStatistics />
      </div>

      {/* Transactions Bar Chart Component */}
      <div>
        <TransactionsBarChart />
      </div>
    </div>
  );
}

export default App;
