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

import {colors, fonts, getData, ImageNull} from '../../utils';
import {ms} from 'react-native-size-matters';
import {Gap, Header, List, Search} from '../../components';
import {Fire} from '../../configs';

const MainChat = ({navigation}) => {
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
        console.log('data: ', res.val());
        if (res.val()) {
          setListUser(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  }, []);

  const myData = Object.keys(listUser).map(key => listUser[key]);
  console.log(myData);

  const listUserStyle = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', item)}>
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
            <Text style={styles.chatTime}>23.59</Text>
            <View style={styles.chatCountBorder}>
              <Text style={styles.chatCount}>99</Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type={'chat'} title={'Chats'} />
      <Gap height={ms(16)} />
      <Search />
      <Gap height={ms(32)} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={myData}
        keyExtractor={item => item.uid}
        renderItem={listUserStyle}
      />
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
