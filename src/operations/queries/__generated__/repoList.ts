/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: repoList
// ====================================================

export interface repoList_search_edges_node_App {
  __typename: "App" | "Issue" | "MarketplaceListing" | "Organization" | "PullRequest" | "User";
}

export interface repoList_search_edges_node_Repository_owner {
  __typename: "Organization" | "User";
  id: string;
  /**
   * The username used to login.
   */
  login: string;
}

export interface repoList_search_edges_node_Repository {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The User owner of the repository.
   */
  owner: repoList_search_edges_node_Repository_owner;
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
  /**
   * The description of the repository.
   */
  description: string | null;
}

export type repoList_search_edges_node = repoList_search_edges_node_App | repoList_search_edges_node_Repository;

export interface repoList_search_edges {
  __typename: "SearchResultItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: repoList_search_edges_node | null;
}

export interface repoList_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of edges.
   */
  edges: (repoList_search_edges | null)[] | null;
}

export interface repoList {
  /**
   * Perform a search across resources.
   */
  search: repoList_search;
}

export interface repoListVariables {
  query: string;
}
