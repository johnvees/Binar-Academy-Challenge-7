import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {colors, fonts, getData, ImageNull, showError} from '../../utils';
import {Fire} from '../../configs';

const List = ({type, navigation}) => {
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

  const listUserStyle = ({item, onPress}) => {
    return (
      <TouchableOpacity>
        <SafeAreaView style={styles.container}>
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

  if (type === 'chat') {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={myData}
          keyExtractor={item => item.uid}
          renderItem={listUserStyle}
        />
      </View>
    );
  } else if (type === 'contact') {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
          }}
          style={styles.profilePhoto}
        />
        <View style={styles.chatContent}>
          <Text
            style={styles.username}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            John Doe
          </Text>
          <Text
            style={styles.lastChat}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            Hello World I'm in a Good Mood Today
          </Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default List;

const styles = StyleSheet.create({
  container: {
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
