import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MINTERCHANGES } from './queries';
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
        <h3>Minter Changes</h3>
      </div>
      <div className="card-content">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="transaction-detail">
            <strong>{key}:</strong> {key === 'Timestamp' ? new Date(parseInt(value) * 1000).toLocaleString() : value}
            {key === 'Minter' || key === 'PreviousMinter' || key === 'NewMinter' || key === 'BlockNumber' || key === 'TransactionHash' ? (
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

const MinterChangedGrid = ({ name }) => {
  const { loading, error, data } = useQuery(GET_MINTERCHANGES);

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
        {data.minterChangeds.map((minterChanged) => (
          <Card
            key={minterChanged.id}
            data={{
              Minter: minterChanged.minter,
              PreviousMinter: minterChanged.previousMinter,
              NewMinter: minterChanged.newMinter,
              BlockNumber: minterChanged.blockNumber,
              TransactionHash: minterChanged.transactionHash,
              Timestamp: minterChanged.blockTimestamp,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MinterChangedGrid;
