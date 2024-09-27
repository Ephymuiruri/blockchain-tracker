import React, { useState, useEffect } from 'react';
import { useQuery, } from '@apollo/client';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import TransfersGrid from './Transfers';
import ApprovalGrid from './Approvals';
import DelegateGrid from './DelegateVoteChange.js';
import DelegateChangedGrid from './DelegateVoteChange';
import MinterChange from './MinterChanged';
import GTCDistChange from './GTCDist';
import './dash_page.css'; // Adjusted CSS file

// Sample queries (ensure these are correctly imported from your queries file)
import { GET_TRANSFERS, GET_APPROVALS } from './queries';

const DashboardLandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { loading: loadingTransfers, error: errorTransfers, data: dataTransfers } = useQuery(GET_TRANSFERS);
  const { loading: loadingApprovals, error: errorApprovals, data: dataApprovals } = useQuery(GET_APPROVALS);

  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
  
    if (dataTransfers && dataTransfers.transfers) {
      const transferData = dataTransfers.transfers.map((transfer) => ({
        date: new Date(parseInt(transfer.blockTimestamp) * 1000).toLocaleDateString(),
        amount: parseFloat(transfer.amount),
        type: transfer.from ? 'Spent' : 'Received', // Adjust based on your logic
      }));
  
      // Aggregate data by date
      const aggregatedData = transferData.reduce((acc, curr) => {
        const date = curr.date;
        if (!acc[date]) {
          acc[date] = { date, received: 0, spent: 0 };
        }
        if (curr.type === 'Received') {
          acc[date].received += curr.amount;
        } else {
          acc[date].spent += curr.amount;
        }
        return acc;
      }, {});
  
      // Convert to array
      const formattedData = Object.values(aggregatedData).sort((a, b) => new Date(a.date) - new Date(b.date));
  
      setAnalyticsData(formattedData);
    }
  }, [dataTransfers,dataApprovals]);
  
  const renderSection = () => {
    if (activeSection === 'home') {
      return (
        <>
          {/* Introduction Section */}
          <section className="intro">
            <h2>Transforming Philanthropy with Blockchain Transparency</h2>
            <p>
              Welcome to our innovative platform that leverages blockchain technology to bring unprecedented transparency and accountability to philanthropic efforts in Kenya. By utilizing smart contracts and decentralized ledgers, we're revolutionizing how funds are tracked, distributed, and verified in real-time.
            </p>
          </section>

          {/* Live Analytics Section */}
          <section className="live-analytics">
            <h2>Live Analytics: Funds Received vs Spent</h2>
            {loadingTransfers || loadingApprovals ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <h2>Loading Analytics...</h2>
              </div>
            ) : errorTransfers || errorApprovals ? (
              <p className="error">Error loading analytics data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#e94560" />
                  <YAxis stroke="#e94560" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="received" stroke="#533483" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="spent" stroke="#e94560" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </section>

          {/* System Potential in Kenya */}
          <section className="kenya-potential">
            <h2>Potential Impact in Kenya</h2>
            <p>
              Implementing this blockchain-based system in Kenya can significantly enhance financial management by ensuring transparency in public and philanthropic fund allocation. This system can be utilized in various sectors such as healthcare, education, and governance to prevent misuse of funds, build trust among stakeholders, and promote responsible spending.
            </p>
          </section>
        </>
      );
    }

    switch (activeSection) {
      case 'transfers':
        return <TransfersGrid name="Transfer" />;
      case 'approvals':
        return <ApprovalGrid name="Approval" />;
      case 'delegatevoteChanges':
        return (
          <>
            <section className="data-explanation">
              <h2>Delegate Vote Changes</h2>
              <p>
                Delegate Vote Changes track when a token holder changes their voting delegate. This data includes:
              </p>
              <ul>
                <li><strong>Delegator:</strong> The address of the token holder changing their delegate</li>
                <li><strong>From Delegate:</strong> The previous delegate's address</li>
                <li><strong>To Delegate:</strong> The new delegate's address</li>
                <li><strong>Block Number and Timestamp:</strong> When the change occurred</li>
              </ul>
            </section>
            <DelegateGrid name="Delegate Vote Changes" />
          </>
        );
      case 'gtcDistChanges':
        return (
          <>
            <section className="data-explanation">
              <h2>GTC Distribution Changes</h2>
              <p>
                GTC Distribution Changes record modifications to the distribution of Gitcoin tokens. This data includes:
              </p>
              <ul>
                <li><strong>Delegator:</strong> The address initiating the distribution change</li>
                <li><strong>Delegatee:</strong> The address receiving the new distribution</li>
                <li><strong>Block Number and Timestamp:</strong> When the change occurred</li>
              </ul>
            </section>
            <GTCDistChange name="GTC Dist Changes" />
          </>
        );
      case 'minterchange':
        return (
          <>
            <section className="data-explanation">
              <h2>Minter Change</h2>
              <p>
                Minter Change records modifications to the minter's address. This data includes:
              </p>
              <ul>
                <li><strong>Minter:</strong> The old minter's address</li>
                <li><strong>New Minter:</strong> The new minter's address</li>
                <li><strong>Block Number and Timestamp:</strong> When the change occurred</li>
              </ul>
            </section>
            <MinterChange name="Minter Change" />
          </>
        );
      case 'delegatechange':
        return (
          <>
            <section className="data-explanation">
              <h2>Delegate Changes</h2>
              <p>
                Delegate Changes track when a token holder changes their voting delegate. This data includes:
              </p>
              <ul>
                <li><strong>Delegator:</strong> The address of the token holder changing their delegate</li>
                <li><strong>From Delegate:</strong> The previous delegate's address</li>
                <li><strong>To Delegate:</strong> The new delegate's address</li>
                <li><strong>Block Number and Timestamp:</strong> When the change occurred</li>
              </ul>
            </section>
            <DelegateChangedGrid name="Delegate Changes" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="landing-page" id="Data-Section">
      <header className="header">
        <h1>Kenya's Blockchain Accountability Dashboard</h1>
      </header>

      <nav className="main-nav">
        <ul>
          <li><button onClick={() => setActiveSection('home')}>Home</button></li>
          <li><button onClick={() => setActiveSection('transfers')}>Transfers</button></li>
          <li><button onClick={() => setActiveSection('approvals')}>Approvals</button></li>
          <li><button onClick={() => setActiveSection('delegatevoteChanges')}>Delegate Vote Changes</button></li>
          <li><button onClick={() => setActiveSection('gtcDistChanges')}>GTC Dist Changes</button></li>
          <li><button onClick={() => setActiveSection('minterchange')}>Minter Change</button></li>
          <li><button onClick={() => setActiveSection('delegatechange')}>DelegateChanges</button></li>
        </ul>
      </nav>

      {renderSection()}

      <footer className="footer">
        <p>Explore our dashboard to see blockchain transparency in action.</p>
      </footer>
    </div>
  );
};

export default DashboardLandingPage;
