import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useQuery} from '@apollo/client';
import {Icon} from 'native-base';

import LoginScreen from './login';
import SignupScreen from './signup';
import HomeScreen from './home';
import DetailsScreen from './details';
import WatchListScreen from './watchList';
import LogoutScreen from './logout';
import CreateIssueScreen from './createIssue';

import {LoginStackParamList, HomeStackParamList, TabParamList} from '../types';

import {GET_LOGIN_TOKEN} from '../operations/queries/getLoginToken';
import {getLoginToken} from '../operations/queries/__generated__/getLoginToken';

const RootStack = createStackNavigator();
const LoginStack = createStackNavigator<LoginStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="CreateIssue" component={CreateIssueScreen} />
    </HomeStack.Navigator>
  );
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator headerMode="none">
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Signup" component={SignupScreen} />
    </LoginStack.Navigator>
  );
}

function TabStackScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 14},
      }}>
      <Tab.Screen
        name="Search"
        component={HomeStackScreen}
        options={{
          tabBarIcon: () => <Icon name="search-outline" style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchListScreen}
        options={{
          tabBarIcon: () => <Icon name="eye-outline" style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="logout"
              type="MaterialCommunityIcons"
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const screens: React.FC<{}> = () => {
  const {data} = useQuery<getLoginToken>(GET_LOGIN_TOKEN);

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        {data?.loginToken ? (
          <RootStack.Screen name="tabs" component={TabStackScreen} />
        ) : (
          <RootStack.Screen name="auth" component={LoginStackScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export default screens;
