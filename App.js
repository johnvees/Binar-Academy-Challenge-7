import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeSplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    ReactNativeSplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
