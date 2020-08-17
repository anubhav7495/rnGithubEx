import {ReactiveVar} from '@apollo/client';
import {signup} from '../../../storage';

export default function createLogin(loginTokenVar: ReactiveVar<string | null>) {
  return async (username: string, password: string) => {
    try {
      const token = await signup(username, password);
      loginTokenVar(token);
      return;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
