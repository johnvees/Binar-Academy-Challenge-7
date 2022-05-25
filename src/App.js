import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeSplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';

import Root from './routes';
import store from './redux/store';
import {Loading} from './components';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  console.log('state Global', stateGlobal);

  useEffect(() => {
    ReactNativeSplashScreen.hide();
  }, []);

  return (
    <>
      <Root />
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
