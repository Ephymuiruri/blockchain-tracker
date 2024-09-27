import { gql } from '@apollo/client';

export const GET_TRANSFERS = gql`
  query GetTransfers {
    transfers(first: 30) {
      id
      from
      to
      amount
      transactionHash
      blockTimestamp
    }
  }
`;
export const GET_APPROVALS =gql`
  query GetApprovals{
    approvals(first: 30) {
        id
        owner
        spender
        amount
        blockTimestamp
      }
    }
  `
export const GET_DELEGATEVOTES = gql`
  query GetDelegateVotes {
  delegateVotesChangeds(first: 10) {
    id
    delegate
    transactionHash
    blockNumber
    previousBalance
    newBalance
    blockTimestamp
  }
}
`;
export const GET_MINTERCHANGES =gql`
  query GetMinterChanges {
  minterChangeds(first: 10) {
    id
    minter
    newMinter
    blockTimestamp
    blockNumber
    transactionHash
  }
}
`;
export const GET_GTCDISTCHANGES = gql`
  query GetGTCDistChanges {
  gtcdistChangeds(first: 10) {
    id
    delegator
    delegatee
    blockNumber
    blockTimestamp
    transactionHash
  }
}`
export const GET_DELEGATECHANGES = gql`
  query GetDelegateChanges {
  delegateChangeds(first: 10) {
    id
    delegator
    fromDelegate
    toDelegate
    blockNumber
    blockTimestamp
    transactionHash
    }
  }`

