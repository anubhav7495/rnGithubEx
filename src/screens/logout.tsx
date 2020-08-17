import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Spinner, Toast} from 'native-base';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../types';
import {logout} from '../operations/mutations/auth';

type LogoutProps = BottomTabScreenProps<TabParamList, 'Logout'>;

const Logout: React.FC<LogoutProps> = () => {
  const logoutOnRender = async () => {
    try {
      await logout();
    } catch (e) {
      Toast.show({text: e, type: 'danger', position: 'top'});
    }
  };

  useEffect(() => {
    logoutOnRender();
    // Empty clean-up function
    return () => {};
  }, []);

  return (
    <View>
      <Spinner />
    </View>
  );
};

export default Logout;
