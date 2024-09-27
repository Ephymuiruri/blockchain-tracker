import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GTCDISTCHANGES } from './queries';
import './dash.css';
import copy from './content_copy.svg';

const Card = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text:', err);
      });
  };

  return (
    <div className="transaction-card">
      <div className="card-header">
        <h3>GTC Distribution Changes</h3>
      </div>
      <div className="card-content">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="transaction-detail">
            <strong>{key}:</strong> {key === 'Timestamp' ? new Date(parseInt(value) * 1000).toLocaleString() : value}
            {key === 'Delegator' || key === 'Delegatee' || key === 'BlockNumber' || key === 'TransactionHash' ? (
              <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={() => copyText(value)}>
                <div className="button-area">
                  <img src={copy} className="copy-icon" alt="copy_icon" />
                  <p>{copied ? 'Copied' : 'Copy'}</p>
                </div>
              </button>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
};

const GTCDistChangedGrid = ({ name }) => {
  const { loading, error, data } = useQuery(GET_GTCDISTCHANGES);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Loading, please wait...</h2>
    </div>
  );
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="transfers-grid">
      <h2 className="grid-title">{name}</h2>
      <div className="grid-container">
      {data.gtcDistChangeds?.[0] ? (
  <Card
    key={data.gtcDistChanged.id} // This should be key={data.gtcDistChangeds[0].id}
    data={{
      Delegator: data.gtcDistChangeds[0].delegator,
      Delegatee: data.gtcDistChangeds[0].delegatee,
      BlockNumber: data.gtcDistChangeds[0].blockNumber,
      TransactionHash: data.gtcDistChangeds[0].transactionHash,
      Timestamp: data.gtcDistChangeds[0].blockTimestamp,
    }}
  />
) : (
  // Handle empty data case (optional)
  <p>No GTC Distribution Changes Found</p>
)}
      </div>
    </div>
  );
};

export default GTCDistChangedGrid;
