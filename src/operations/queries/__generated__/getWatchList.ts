/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getWatchList
// ====================================================

export interface getWatchList_watchList_owner {
  __typename: "Organization" | "User";
  id: string;
  /**
   * The username used to login.
   */
  login: string;
}

export interface getWatchList_watchList {
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
  owner: getWatchList_watchList_owner;
  /**
   * The description of the repository.
   */
  description: string | null;
}

export interface getWatchList {
  watchList: (getWatchList_watchList | null)[] | null;
}
