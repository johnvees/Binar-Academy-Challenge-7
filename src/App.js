import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeSplashScreen from 'react-native-splash-screen';
import Root from './routes';

const App = () => {
  useEffect(() => {
    ReactNativeSplashScreen.hide();
  }, []);

  return <Root />;
};

export default App;

const styles = StyleSheet.create({});
