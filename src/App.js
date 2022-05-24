import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeSplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

import Root from './routes';
import {Fire} from './configs';

const App = ({navigation}) => {
  useEffect(() => {
    ReactNativeSplashScreen.hide();
  }, []);

  return (
    <>
      <Root />
      <FlashMessage position="top" />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
