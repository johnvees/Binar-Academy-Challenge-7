import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

import {Button, Gap, Header} from '../../components';
import {colors, fonts, getData, ImageNull} from '../../utils';

const MainProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    avatar: {
      uri: ImageNull,
    },
    fullName: '',
    bio: 'Empty Bio',
  });

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      data.avatar = {uri: res.avatar};
      console.log('new data user: ', data);
      setProfile(data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header type={'contact'} title={'Profile'} />
      <Gap height={ms(24)} />
      <View style={styles.photoContent}>
        <Image source={profile.avatar} style={styles.profilePhoto} />
      </View>
      <Gap height={ms(16)} />
      <View style={styles.nameContent}>
        <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={2}>
          {profile.fullName}
        </Text>
        <Text style={styles.bio} ellipsizeMode={'tail'} numberOfLines={2}>
          {profile.bio}
        </Text>
      </View>
      <Gap height={ms(24)} />
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
        style={{
          paddingVertical: ms(16),
          borderBottomWidth: 1,
          borderBottomColor: colors.text.secondary,
        }}>
        <View style={styles.editProfileContent}>
          <View style={{flex: 1}}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </View>
          <Feather name="chevron-right" size={ms(24)} color={colors.white} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button type={'fullButton'} title={'Logout'} danger />
      </View>
    </SafeAreaView>
  );
};

export default MainProfile;

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
  nameContent: {
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.primary[500],
    color: colors.text.primary,
    fontSize: ms(24),
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  bio: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(16),
    textAlign: 'center',
  },
  editProfileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfile: {
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    fontSize: ms(16),
  },
});
