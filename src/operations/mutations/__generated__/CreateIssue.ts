/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateIssue
// ====================================================

export interface CreateIssue_createIssue_issue_repository_owner {
  __typename: "Organization" | "User";
  id: string;
  /**
   * The username used to login.
   */
  login: string;
}

export interface CreateIssue_createIssue_issue_repository {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The User owner of the repository.
   */
  owner: CreateIssue_createIssue_issue_repository_owner;
}

export interface CreateIssue_createIssue_issue {
  __typename: "Issue";
  id: string;
  /**
   * Identifies the body of the issue.
   */
  body: string;
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
  /**
   * The repository associated with this node.
   */
  repository: CreateIssue_createIssue_issue_repository;
}

export interface CreateIssue_createIssue {
  __typename: "CreateIssuePayload";
  /**
   * The new issue.
   */
  issue: CreateIssue_createIssue_issue | null;
}

export interface CreateIssue {
  /**
   * Creates a new issue.
   */
  createIssue: CreateIssue_createIssue | null;
}

export interface CreateIssueVariables {
  repositoryId: string;
  title: string;
  body?: string | null;
}
