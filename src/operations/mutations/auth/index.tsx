import createLogin from './login';
import createLogout from './logout';
import createSignup from './signup';
import {loginTokenVar, watchListVar} from '../../../client';

export const login = createLogin(loginTokenVar, watchListVar);
export const logout = createLogout(loginTokenVar, watchListVar);
export const signup = createSignup(loginTokenVar);
