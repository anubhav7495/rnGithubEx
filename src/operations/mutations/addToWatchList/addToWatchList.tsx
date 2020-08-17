import {ReactiveVar} from '@apollo/client';
import {repoList_search_edges_node_Repository as repository} from '../../queries/__generated__/repoList';
import {setWatchList} from '../../../storage';

export default function createAddToWatchList(
  loginTokenVar: ReactiveVar<string | null>,
  watchListVar: ReactiveVar<repository[]>,
) {
  return async (repo: repository) => {
    const token = loginTokenVar();
    const watchList = watchListVar();
    const newWatchList = watchList.concat([repo]);
    try {
      await setWatchList(token, newWatchList);
      watchListVar(newWatchList);
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
