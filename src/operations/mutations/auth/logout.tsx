import {ReactiveVar} from '@apollo/client';
import {logout} from '../../../storage';
import {repoList_search_edges_node_Repository as repository} from '../../queries/__generated__/repoList';

export default function createLogout(
  loginTokenVar: ReactiveVar<string | null>,
  watchListVar: ReactiveVar<repository[]>,
) {
  return async () => {
    try {
      await logout();
      loginTokenVar(null);
      watchListVar([]);
      return;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
