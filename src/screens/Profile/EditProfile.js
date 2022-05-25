import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ms} from 'react-native-size-matters';

import {Button, Gap, Header} from '../../components';
import {colors, fonts, getData, ImageNull, storeData} from '../../utils';
import {Fire} from '../../configs';

const EditProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    avatar: {
      uri: ImageNull,
    },
    fullName: 'Empty Name',
    bio: 'Empty Bio',
  });

  const [password, setPassword] = useState('');

  const [photo, setPhoto] = useState({
    uri: ImageNull,
  });
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      setPhoto({uri: res.avatar});
      console.log('new data user: ', data);
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('profile :', profile);

    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password must have minumum of 6 character',
          type: 'default',
          backgroundColor: colors.icon.danger,
          color: colors.text.primary,
        });
      } else {
        updatePassword();
        updateProfileData();
        navigation.navigate('MainApp');
      }
    } else {
      updateProfileData();
      navigation.navigate('MainApp');
    }
  };

  const updatePassword = () => {
    Fire.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.icon.danger,
            color: colors.text.primary,
          });
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.avatar = photoForDB;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('succes :', data);
        storeData('user', data);
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.icon.danger,
          color: colors.text.primary,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

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
        const source = {uri: response.assets[0].uri};
        setPhotoForDB(
          `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
        );

        setPhoto(source);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={'finalRegist'}
        title={'Edit Profile'}
        onPress={() => navigation.goBack()}
      />
      <Gap height={ms(24)} />
      <ScrollView>
        <TouchableOpacity onPress={getImage}>
          <View style={styles.photoContent}>
            <Image source={photo} style={styles.profilePhoto} />
          </View>
        </TouchableOpacity>
        <Gap height={ms(24)} />
        <View style={{flex: 1}}>
          <Text style={styles.label}>Full Name</Text>
          <Gap height={ms(8)} />
          <TextInput
            style={styles.textInput}
            placeholder="Input Your Full Name Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={ms(16)} />
          <Text style={styles.label}>Bio</Text>
          <Gap height={ms(8)} />
          <TextInput
            style={styles.textInput}
            placeholder="Input Your Bio Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            value={profile.bio}
            onChangeText={value => changeText('bio', value)}
          />
          <Gap height={ms(16)} />
          <Text style={styles.label}>Email *cannot be updated</Text>
          <Gap height={ms(8)} />
          <TextInput
            style={styles.textInput}
            placeholder="Input Your Email Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            editable={false}
            value={profile.email}
          />
          <Gap height={ms(16)} />
          <Text style={styles.label}>Password</Text>
          <Gap height={ms(8)} />
          <TextInput
            style={styles.textInput}
            placeholder="Input Your Password Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            secureTextEntry={true}
            value={password}
            onChangeText={value => {
              setPassword(value);
            }}
          />
        </View>
      </ScrollView>
      <View>
        <Button
          type={'fullButton'}
          title={'Save and Continue'}
          onPress={update}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

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
    width: ms(100),
    height: ms(100),
    borderRadius: ms(100 / 2),
    resizeMode: 'contain',
  },
  label: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(14),
  },
  textInput: {
    borderRadius: ms(6),
    backgroundColor: colors.background.secondary,
    height: ms(44),
    paddingHorizontal: ms(16),
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(14),
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
