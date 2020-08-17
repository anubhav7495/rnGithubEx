import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Root, Spinner, H3} from 'native-base';

import {ApolloProvider} from '@apollo/client';
import {client, loginTokenVar, watchListVar} from './client';

import Screens from './screens';
import {getLoginToken, getWatchList} from './storage';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const loadStateFromStorage = async () => {
    try {
      const loginToken = await getLoginToken();
      const watchList = await getWatchList(loginToken);
      loginTokenVar(loginToken);
      watchListVar(watchList);
    } catch (e) {
      // call sentry here
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadStateFromStorage();
    // Empty clean-up function
    return () => {};
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={styles.loadingView}>
        <Spinner color="#fff" />
        <H3 style={styles.loadingText}>Loading...</H3>
      </View>
    );
  }

  return (
    <Root>
      <ApolloProvider client={client}>
        <Screens />
      </ApolloProvider>
    </Root>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
  },
});

export default App;
