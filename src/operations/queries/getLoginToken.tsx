import {gql} from '@apollo/client';

export const GET_LOGIN_TOKEN = gql`
  query getLoginToken {
    loginToken @client
  }
`;
