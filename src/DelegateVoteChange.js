import React from 'react';
import { useState } from'react';
import { useQuery } from '@apollo/client';
import { GET_DELEGATEVOTES } from './queries';
import './dash.css';
import copy from './content_copy.svg';


const Card = ({ data}) => {
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
  return(
    <div className="transaction-card">
        <div className="card-header">
          <h3>Delegate Changes</h3>
        </div>
        <div className="card-content">
          {Object.entries(data).map(([key, value]) => (
            <p key={key} className="transaction-detail">
              <strong>{key}:</strong> {key === 'Timestamp' ? new Date(parseInt(value) * 1000).toLocaleString() : value}
              {key === 'Delegate' || key === 'BlockNumber' || key === 'transactionHash'  ? ( 
              <button
                className={`copy-button ${copied ? 'copied' : ''}`} 
                onClick={() => copyText(value)}
              >
                {copied ?
                <div className='button-area'>
                  <img src={copy} className ='copy-icon' alt='copy_icon'></img>
                 <p>Copied</p>
                </div> 
                :
                <div className='button-area'>
                  <img src={copy} className ='copy-icon' alt='copy_icon'></img>
                 <p>Copy</p>
                </div> 
               }
              </button>
            ) : null}
            </p>
          ))}
        </div>
      </div>
  );
}

const DelegateGrid = ({name}) => {
  console.log(name);
    const { loading, error, data } = useQuery(GET_DELEGATEVOTES);
  
    if (loading) return( 
    <div className="loading-container">
    <div className="spinner"></div>
    <h2>Loading, please wait...</h2>
  </div>);
    if (error) return <p className="error">Error: {error.message}</p>;
  
    return (
      <div className="transfers-grid">
      <h2 className="grid-title">{name}</h2>
      <div className="grid-container">
        {data.delegateVotesChangeds.map((delegateVotesChanged) => (
          <Card
            key={delegateVotesChanged.id}
            data={{
              Delegate: delegateVotesChanged.delegate,
              BlockNumber:delegateVotesChanged.blockNumber,
              TransactionHash:delegateVotesChanged.transactionHash,
              previousBalance: delegateVotesChanged.previousBalance,
              newBalance: delegateVotesChanged.newBalance,
              
              Timestamp: delegateVotesChanged.blockTimestamp,
            }}
          />
        ))}
      </div>
    </div>
    );
  };
  
  export default DelegateGrid;