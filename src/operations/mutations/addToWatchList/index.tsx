import createAddToWatchList from './addToWatchList';
import {loginTokenVar, watchListVar} from '../../../client';

export const addToWatchList = createAddToWatchList(loginTokenVar, watchListVar);
