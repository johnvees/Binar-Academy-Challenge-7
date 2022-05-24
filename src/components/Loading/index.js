import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors, fonts} from '../../utils';
import {ms} from 'react-native-size-matters';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.button.background} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP('100%'),
    width: widthPercentageToDP('100'),
    backgroundColor: colors.loadingBackground,
  },
  text: {
    fontFamily: fonts.primary[600],
    fontSize: ms(20),
    color: colors.button.background,
    marginTop: ms(16),
  },
});
