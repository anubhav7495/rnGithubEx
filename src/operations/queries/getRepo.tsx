import {gql} from '@apollo/client';

export const GET_REPO = gql`
  query repo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      nameWithOwner
      owner {
        id
        login
      }
      description
      issues(
        first: 5
        orderBy: {field: CREATED_AT, direction: DESC}
        states: OPEN
      ) {
        edges {
          node {
            id
            createdAt
            title
            number
          }
        }
      }
      pullRequests(states: OPEN) {
        totalCount
      }
      isWatching @client
    }
  }
`;
