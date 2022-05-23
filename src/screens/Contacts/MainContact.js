import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../utils';
import {ms} from 'react-native-size-matters';
import {Gap, Header, List, Search} from '../../components';

const MainContact = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header type={'contact'} title={'Contacts'} />
      <Gap height={ms(16)} />
      <Search />
      <Gap height={ms(32)} />
      <List type={'contact'} />
    </SafeAreaView>
  );
};

export default MainContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: ms(24),
  },
});
