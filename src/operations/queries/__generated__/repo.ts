/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: repo
// ====================================================

export interface repo_repository_owner {
  __typename: "Organization" | "User";
  id: string;
  /**
   * The username used to login.
   */
  login: string;
}

export interface repo_repository_issues_edges_node {
  __typename: "Issue";
  id: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * Identifies the issue title.
   */
  title: string;
  /**
   * Identifies the issue number.
   */
  number: number;
}

export interface repo_repository_issues_edges {
  __typename: "IssueEdge";
  /**
   * The item at the end of the edge.
   */
  node: repo_repository_issues_edges_node | null;
}

export interface repo_repository_issues {
  __typename: "IssueConnection";
  /**
   * A list of edges.
   */
  edges: (repo_repository_issues_edges | null)[] | null;
}

export interface repo_repository_pullRequests {
  __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface repo_repository {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
  /**
   * The User owner of the repository.
   */
  owner: repo_repository_owner;
  /**
   * The description of the repository.
   */
  description: string | null;
  /**
   * A list of issues that have been opened in the repository.
   */
  issues: repo_repository_issues;
  /**
   * A list of pull requests that have been opened in the repository.
   */
  pullRequests: repo_repository_pullRequests;
  isWatching: boolean;
}

export interface repo {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: repo_repository | null;
}

export interface repoVariables {
  name: string;
  owner: string;
}
