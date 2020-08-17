import {gql} from '@apollo/client';

export const GET_WATCH_LIST = gql`
  query getWatchList {
    watchList @client {
      id
      name
      nameWithOwner
      owner {
        id
        login
      }
      description
    }
  }
`;
