import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Fire} from '../../configs';
import {colors} from '../../utils';

const Unused = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          console.log('user: ', user);
          navigation.replace('MainApp');
        } else {
          navigation.replace('Login');
        }
      }, 1);
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: colors.background.primary}}></View>
  );
};

export default Unused;

const styles = StyleSheet.create({});
