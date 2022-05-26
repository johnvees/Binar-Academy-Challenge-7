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
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messageDB = rootDB.child(urlHistory);

    messageDB.on('value', async snapshot => {
      console.log('data history', snapshot.val());
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async key => {
          const urlUidOther = `users/${oldData[key].uidPartner}`;
          const detailOther = await rootDB.child(urlUidOther).once('value');
          console.log('detail other', detailOther.val());
          data.push({
            id: key,
            detailOther: detailOther.val(),
            ...oldData[key],
          });
        });

        await Promise.all(promises);

        console.log('new data history', data);
        setHistoryChat(data);
        console.log('test data', historyChat);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      console.log('user login: ', res);
      setUser(res);
    });
  };

  const listUserStyle = ({item}) => {
    const dataForOthers = {
      id: item.detailOther.uid,
      data: item.detailOther,
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'ChatRoom',
            item.detailOther,
            console.log('test coba', dataForOthers),
          )
        }>
        <SafeAreaView style={styles.content}>
          <Image
            source={{uri: item.detailOther.avatar}}
            style={styles.profilePhoto}
          />
          <View style={styles.chatContent}>
            <Text
              style={styles.username}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {item.detailOther.fullName}
            </Text>
            <Text
              style={styles.lastChat}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {item.lastContentChat}
            </Text>
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatTime}>{item.lastChatTime}</Text>
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
        data={historyChat}
        keyExtractor={item => item.id}
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
