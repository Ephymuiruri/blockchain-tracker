import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DELEGATECHANGES } from './queries';
import './dash.css';
import copy from './content_copy.svg';

const Card = ({ data }) => {
  const [copied, setCopied] = useState(false); // State to track copy status

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
        <h3>Delegate Changes</h3>
      </div>
      <div className="card-content">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="transaction-detail">
            <strong>{key}:</strong> {key === 'Timestamp' ? new Date(parseInt(value) * 1000).toLocaleString() : value}
            {key === 'Delegator' || key === 'FromDelegate' || key === 'ToDelegate' || key === 'BlockNumber' || key === 'TransactionHash' ? (
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

const DelegateChangedGrid = ({ name }) => {
  const { loading, error, data } = useQuery(GET_DELEGATECHANGES);

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
        {data.delegateChangeds.map((delegateChanged) => (
          <Card
            key={delegateChanged.id}
            data={{
              Delegator: delegateChanged.delegator,
              FromDelegate: delegateChanged.fromDelegate,
              ToDelegate: delegateChanged.toDelegate,
              BlockNumber: delegateChanged.blockNumber,
              TransactionHash: delegateChanged.transactionHash,
              Timestamp: delegateChanged.blockTimestamp,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DelegateChangedGrid;
