import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Gap, Header} from '../../components';
import {colors, fonts, ImageNull} from '../../utils';
import {ms} from 'react-native-size-matters';

const NewChat = ({navigation, route}) => {
  const dataUser = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={'finalRegist'}
        title={'Detail Profile'}
        onPress={() => navigation.goBack()}
      />
      <Gap height={ms(70)} />
      <View style={styles.photoContent}>
        <Image source={{uri: dataUser.avatar}} style={styles.profilePhoto} />
      </View>
      <Gap height={ms(24)} />
      <View style={styles.nameContent}>
        <Text style={styles.name}>{dataUser.fullName}</Text>
        <Text style={styles.bio}>{dataUser.bio}</Text>
      </View>
      <Gap height={ms(24)} />
      <View>
        <Button
          type={'fullButton'}
          title={'Chat Now'}
          onPress={navigation.navigate('ChatRoom', dataUser)}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: ms(24),
  },
  photoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: ms(150),
    height: ms(150),
    borderRadius: ms(150 / 2),
    resizeMode: 'contain',
  },
  nameContent: {
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.primary[500],
    color: colors.text.primary,
    fontSize: ms(24),
    textAlign: 'center',
  },
  bio: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(16),
    textAlign: 'center',
  },
});
