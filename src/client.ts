import {
  InMemoryCache,
  ReactiveVar,
  makeVar,
  gql,
  NormalizedCacheObject,
  ApolloClient,
} from '@apollo/client';
import {repoList_search_edges_node_Repository as repository} from './screens/__generated__/repoList';
import {API_URL, API_TOKEN} from './constants';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        isWatching: {
          read(_, {variables}) {
            const index = watchListVar().findIndex(
              (list) =>
                list.name === variables?.name &&
                list.owner.login === variables?.owner,
            );
            return index > -1;
          },
        },
      },
    },
    Query: {
      fields: {
        loginToken() {
          return loginTokenVar();
        },
        watchList() {
          return watchListVar();
        },
      },
    },
  },
});

export const typeDefs = gql`
  extend type Query {
    loginToken: String
    watchList: [Repository]
  }

  extend type Repository {
    isWatching: Boolean!
  }
`;

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: API_URL,
  cache,
  headers: {
    authorization: API_TOKEN ? `bearer ${API_TOKEN}` : '',
  },
  typeDefs,
  resolvers: {},
});

export const loginTokenVar: ReactiveVar<string | null> = makeVar<string | null>(
  null,
);
export const watchListVar: ReactiveVar<repository[]> = makeVar<repository[]>(
  [],
);
