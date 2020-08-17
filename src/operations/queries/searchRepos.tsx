import {gql} from '@apollo/client';

export const SEARCH_REPOS = gql`
  query repoList($query: String!) {
    search(query: $query, type: REPOSITORY, first: 20) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              id
              login
            }
            nameWithOwner
            description
          }
        }
      }
    }
  }
`;
