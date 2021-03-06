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

import {colors, fonts, ImageNull, storeData, useForm} from '../../utils';
import {Button, Gap, Header} from '../../components';
import {Fire} from '../../configs';

const FinalRegister = ({navigation, route}) => {
  const [photo, setPhoto] = useState(ImageNull);

  const [form, setForm] = useForm({
    bio: '',
  });

  const {fullName, uid} = route.params;
  const [photoForDB, setPhotoForDB] = useState(ImageNull);

  const getImage = () => {
    launchImageLibrary({includeBase64: true, quality: 0.5}, response => {
      console.log('response :', response);
      if (response.didCancel === true || response.error === true) {
        showMessage({
          message: 'Failed to choose photo',
          type: 'default',
          backgroundColor: colors.icon.danger,
          color: colors.text.primary,
        });
      } else {
        // const source = {uri: };
        setPhotoForDB(
          `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
        );

        setPhoto(response.assets[0].uri);
      }
    });
  };

  const uploadAndContinue = () => {
    Fire.database()
      .ref('users/' + uid + '/')
      .update({avatar: photoForDB, bio: form.bio});

    const data = route.params;
    data.avatar = photoForDB;
    data.bio = form.bio;
    console.log(data);

    storeData('user', data);

    navigation.replace('MainApp');
  };

  const BioValue = () => {
    if (form.bio.length > 1) {
      return (
        <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
          {form.bio}
        </Text>
      );
    } else {
      return (
        <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
          This Gonna Be Your Bio
        </Text>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={'finalRegist'}
        title={'Upload Photo'}
        onPress={() => navigation.navigate('Register')}
      />
      <Gap height={ms(24)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photoContent}>
          <Image source={{uri: photo}} style={styles.profilePhoto} />
        </View>
        <Gap height={ms(24)} />
        <View style={styles.nameContent}>
          <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={2}>
            {fullName}
          </Text>
          <BioValue ellipsizeMode={'tail'} numberOfLines={2} />
        </View>
        <Gap height={ms(64)} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.textInput}
            placeholder="Input Your Bio Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            value={form.bio}
            onChangeText={value => {
              setForm('bio', value);
            }}
          />
          <Gap height={ms(16)} />
          <Button type={'fullButton'} title={'Add Photo'} onPress={getImage} />
        </View>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'fullButton'}
          title={'Upload and Continue'}
          onPress={uploadAndContinue}
        />
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
