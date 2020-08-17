import {ReactiveVar} from '@apollo/client';
import {login, getWatchList} from '../../../storage';
import {repoList_search_edges_node_Repository as repository} from '../../queries/__generated__/repoList';

export default function createLogin(
  loginTokenVar: ReactiveVar<string | null>,
  watchListVar: ReactiveVar<repository[]>,
) {
  return async (username: string, password: string) => {
    try {
      const token = await login(username, password);
      const watchList = await getWatchList(token);
      loginTokenVar(token);
      watchListVar(watchList);
      return;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
