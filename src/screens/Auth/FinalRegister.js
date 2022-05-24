import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import {colors, fonts} from '../../utils';
import {Button, Gap, Header} from '../../components';

const FinalRegister = () => {
  const [Pencarian, setPencarian] = useState('');
  const [photo, setPhoto] = useState({
    uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
  });
  const getImage = () => {
    launchImageLibrary({}, response => {
      console.log('response :', response);
      if (response.didCancel === true || response.error === true) {
        showMessage({
          message: 'Failed to choose photo',
          type: 'default',
          backgroundColor: colors.icon.danger,
          color: colors.text.primary,
        });
      } else {
        const source = {uri: response.uri};
        setPhoto(source);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type={'finalRegist'} title={'Upload Photo'} />
      <Gap height={ms(24)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photoContent}>
          <Image source={photo} style={styles.profilePhoto} />
        </View>
        <Gap height={ms(24)} />
        <View style={styles.nameContent}>
          <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={2}>
            John Doe
          </Text>
          <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
            Hello World I'm in a Good Mood Today
          </Text>
        </View>
        <Gap height={ms(64)} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.textInput}
            placeholder="Input Your Bio Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            onChangeText={text => {
              setPencarian(text);
            }}
          />
          <Gap height={ms(16)} />
          <Button type={'fullButton'} title={'Add Photo'} onPress={getImage} />
        </View>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button type={'fullButton'} title={'Upload and Continue'} />
        <Gap height={ms(8)} />
        <Button type={'textOnly'} secondaryTitle={'Skip this step'} />
      </View>
    </SafeAreaView>
  );
};

export default FinalRegister;

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
    marginRight: ms(16),
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
  textInput: {
    borderRadius: ms(6),
    backgroundColor: colors.background.secondary,
    height: ms(36),
    paddingHorizontal: ms(16),
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
