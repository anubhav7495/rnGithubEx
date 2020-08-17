export type LoginStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: {
    name: string;
    owner: string;
  };
  CreateIssue: {
    name: string;
    owner: string;
    repositoryId: string | undefined;
  };
};

export type TabParamList = {
  Search: undefined;
  WatchList: undefined;
  Logout: undefined;
  Details: {
    name: string;
    owner: string;
  };
};
