import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../utils';
import {ms} from 'react-native-size-matters';
import {Gap, Header, Search} from '../../components';

const MainChat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header type={'chat'} title={'Chats'} />
      <Gap height={ms(16)} />
      <Search />
      <Gap height={ms(16)} />
    </SafeAreaView>
  );
};

export default MainChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: ms(24),
  },
});
