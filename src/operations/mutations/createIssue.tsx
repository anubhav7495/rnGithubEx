import {gql, useMutation} from '@apollo/client';
import {GET_REPO} from '../queries/getRepo';

export const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String) {
    createIssue(
      input: {repositoryId: $repositoryId, title: $title, body: $body}
    ) {
      issue {
        id
        body
        createdAt
        title
        number
        repository {
          name
          owner {
            id
            login
          }
        }
      }
    }
  }
`;

export function useCreateIssue() {
  const [mutate, {data, loading, error}] = useMutation(CREATE_ISSUE, {
    update: (cache, {data}) => {
      const {
        id,
        title,
        createdAt,
        number,
        repository,
      } = data?.createIssue.issue;

      const {name, owner} = repository;

      const newIssue = [
        {
          __typename: 'IssueEdge',
          node: {
            __typename: 'Issue',
            createdAt,
            id,
            number,
            title,
          },
        },
      ];

      let repo = cache.readQuery({
        query: GET_REPO,
        variables: {name, owner: owner.login},
      });

      if (repository) {
        cache.writeQuery({
          query: GET_REPO,
          variables: {name, owner: owner.login},
          data: {
            repository: {
              issues: {
                edges: newIssue.concat(repo.repository.issues.edges),
              },
            },
          },
        });
      }
    },
  });
  return {mutate, data, loading, error};
}
