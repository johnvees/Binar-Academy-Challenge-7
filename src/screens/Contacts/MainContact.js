import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import {colors, fonts, getData, ImageNull, showError} from '../../utils';
import {ms} from 'react-native-size-matters';
import {Gap, Header, List, Search} from '../../components';
import {Fire} from '../../configs';

const MainContact = ({navigation}) => {
  const [profile, setProfile] = useState({
    avatar: {
      uri: ImageNull,
    },
    fullName: '',
    bio: 'Empty Bio',
  });
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      data.avatar = {uri: res.avatar};
      console.log('new data user: ', data);
      setProfile(data);
    });

    Fire.database()
      .ref('users/')
      .once('value')
      .then(res => {
        console.log('data: ', Object.values(res.val()));
        console.log('data lama: ', profile.uid);
        if (res.val()) {
          // const oldData = res.val();
          // const nextOldData = Object.keys(oldData).map(key => listUser[key]);
          // console.log('test res val :', oldData, nextOldData);
          setListUser(
            Object.values(res.val()).filter(it => it.uid != profile.uid),
          );
          console.log(
            'tes set list user',
            Object.values(res.val()).filter(it => it.uid != profile.uid),
          );
          // setListUser(console.log(Object.values(res.val())));
        } else {
          // console.log('list user: ', listUser);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  }, []);

  const myData = Object.keys(listUser).map(key => listUser[key]);
  console.log(myData);

  const listContact = ({item}) => {
    const chatuuid = uuid.v4();

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'NewChat',
            {data: item, chatuuid: chatuuid},
            console.log('dari main contact:', chatuuid, item),
          )
        }>
        <SafeAreaView style={styles.content}>
          <Image source={{uri: item.avatar}} style={styles.profilePhoto} />
          <View style={styles.chatContent}>
            <Text
              style={styles.username}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {item.fullName}
            </Text>
            <Text
              style={styles.lastChat}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {item.bio}
            </Text>
          </View>
          <View style={styles.chatInfo}>
            {/* <Text style={styles.chatTime}>{item.lastChatTime}</Text>
            <View style={styles.chatCountBorder}>
              <Text style={styles.chatCount}>99</Text>
            </View> */}
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type={'contact'} title={'Contacts'} />
      <Gap height={ms(16)} />
      <Search />
      <Gap height={ms(32)} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={myData}
        keyExtractor={item => item.uid}
        renderItem={listContact}
      />
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
  content: {
    marginBottom: ms(16),
    flexDirection: 'row',
    // backgroundColor: colors.button.background,
  },
  profilePhoto: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    marginRight: ms(16),
    resizeMode: 'contain',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: colors.icon.danger,
  },
  username: {
    fontFamily: fonts.primary[500],
    color: colors.text.primary,
    fontSize: ms(18),
    textTransform: 'capitalize',
  },
  lastChat: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(12),
  },
  chatInfo: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: colors.icon.danger,
  },
  chatTime: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(12),
  },
  chatCountBorder: {
    width: ms(18),
    height: ms(18),
    borderRadius: ms(18 / 2),
    backgroundColor: colors.button.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatCount: {
    fontFamily: fonts.primary[400],
    color: colors.button.secondary,
    fontSize: ms(12),
  },
});
