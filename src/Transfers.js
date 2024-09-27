import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRANSFERS } from './queries';
import './dash.css';
import copy from './content_copy.svg';
import link from './link.svg';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TransactionCard = ({ data }) => {
  const [copied, setCopied] = useState(false); // State to track copy status

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true); // Set copied state to true for visual feedback
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 3 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text:', err);
      });
  };

  return (
    <div className="transaction-card">
      <div className="card-header">
        <h3>{data.name} Details</h3>
      </div>
      <div className="card-content">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="transaction-detail">
            <strong>{key}:</strong> {key === 'Timestamp' ? new Date(parseInt(value) * 1000).toLocaleString() : value}
            {key === 'From' || key === 'To' ? (
              <button
                className={`copy-button ${copied ? 'copied' : ''}`} // Add 'copied' class for styling
                onClick={() => copyText(value)}
              >
                {copied ? (
                  <div className='button-area'>
                    <img src={copy} className='copy-icon' alt='copy_icon' />
                    <p>Copied</p>
                  </div>
                ) : (
                  <div className='button-area'>
                    <img src={copy} className='copy-icon' alt='Link_icon' />
                    <p>Copy</p>
                  </div>
                )}
              </button>
            ) : null}
            {key === 'TransactionHash' ? (<a href={`https://etherscan.io/tx/${value}`} target='blank' title='etherscan'>
              <img src={link} className='copy-icon link' alt='copy_icon' />
            </a>): null }
          </p>
        ))}
      </div>
    </div>
  );
};

const TransfersGrid = ({ name }) => {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Loading, please wait...</h2>
    </div>
  );
  if (error) return <p className="error">Error: {error.message}</p>;

  const transfers = data.transfers;
  const totalPages = Math.ceil(transfers.length / recordsPerPage);

  // Pagination logic
  const handlePageChange = (page) => setCurrentPage(page);
  const paginatedTransfers = transfers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  // Prepare data for analytics (e.g., total amount per day)
  const analyticsData = transfers.map((transfer) => ({
    name: new Date(parseInt(transfer.blockTimestamp) * 1000).toLocaleDateString(),
    Amount: parseFloat(transfer.amount),
  }));

  return (
    <div className="transfers-grid">
      <h2 className="grid-title">Transfers</h2>

      {/* Analytics Chart */}
      <div className="chart-container">
        <h3>Amount Transferred Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Transfers Grid */}
      <div className="grid-container">
        {paginatedTransfers.map((transfer) => (
          <TransactionCard
            key={transfer.id}
            data={{
              From: transfer.from,
              To: transfer.to,
              TransactionHash: transfer.transactionHash,
              Amount: transfer.amount,
              Timestamp: transfer.blockTimestamp,
              name: name,
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransfersGrid;
