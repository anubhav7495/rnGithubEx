import AsyncStorage from '@react-native-community/async-storage';
import {Buffer} from 'buffer';
import {repoList_search_edges_node_Repository as repository} from './screens/__generated__/repoList';

export const signup = async (username: string, password: string) => {
  try {
    const value = await AsyncStorage.getItem(username);
    if (value !== null) {
      return Promise.reject('Username already exists');
    }
  } catch (e) {
    return Promise.reject(e);
  }

  try {
    await AsyncStorage.setItem(username, password);
    const token = getToken(username, password);
    await AsyncStorage.setItem('loginToken', token);
    return token;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const login = async (username: string, password: string) => {
  try {
    const value = await AsyncStorage.getItem(username);
    if (value == null) {
      return Promise.reject('Username does not exist!');
    } else if (value !== password) {
      return Promise.reject('Incorrect Password!');
    }
    const token = getToken(username, password);
    await AsyncStorage.setItem('loginToken', token);
    return token;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('loginToken');
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getLoginToken = async () => {
  try {
    const token = await AsyncStorage.getItem('loginToken');
    return token;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const setWatchList = async (
  token: string | null,
  watchList: repository[],
) => {
  try {
    const jsonValue = JSON.stringify(watchList);
    await AsyncStorage.setItem(`watch_list_${token}`, jsonValue);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getWatchList = async (token: string | null) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`watch_list_${token}`);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return Promise.reject(e);
  }
};

function getToken(username: String, password: String): string {
  return new Buffer(username + ':' + password).toString('base64');
}
