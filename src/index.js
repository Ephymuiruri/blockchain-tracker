import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/89940/gitcoin/version/latest',  // Replace with your subgraph endpoint
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

