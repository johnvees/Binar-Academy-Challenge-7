import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {Gap, Header} from '../../components';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from '../../utils';
import DarkDoodle from '../../assets/dark-doodle.jpg';
import {Fire} from '../../configs';

const ChatRoom = ({navigation, route}) => {
  const dataUser = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState('');
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const chatID = `${user.uid}_${dataUser.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    Fire.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        console.log('data chat', snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            }),
              allDataChat.push({
                id: key,
                data: newDataChat,
              });
          });
          console.log('all data chat', allDataChat);
          setChatData(allDataChat);
        }
      });
  }, [dataUser.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      console.log('user login: ', res);
      setUser(res);
    });
  };

  const chatSend = () => {
    if (chatContent.length < 1) {
    } else {
      console.log('user', user);
      const today = new Date();
      const data = {
        sendBy: user.uid,
        chatDate: today.getTime(),
        chatTime: getChatTime(today),
        chatContent: chatContent,
      };

      const chatID = `${user.uid}_${dataUser.uid}`;

      const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
      const urlMessageUser = `messages/${user.uid}/${chatID}`;
      const urlMessageOther = `messages/${dataUser.uid}/${chatID}`;
      const dataHistoryChatForUser = {
        lastContentChat: chatContent,
        lastChatDate: today.getTime(),
        lastChatTime: getChatTime(today),
        uidPartner: dataUser.uid,
      };
      const dataHistoryChatForOther = {
        lastContentChat: chatContent,
        lastChatDate: today.getTime(),
        lastChatTime: getChatTime(today),
        uidPartner: user.uid,
      };

      console.log('data untuk dikirim: ', data);
      console.log(urlFirebase);
      // send to firebase
      Fire.database()
        .ref(urlFirebase)
        .push(data)
        .then(() => {
          setChatContent('');
          //set history for user
          Fire.database().ref(urlMessageUser).set(dataHistoryChatForUser);

          //set history for other
          Fire.database().ref(urlMessageOther).set(dataHistoryChatForOther);
        })
        .catch(err => {
          showError(err.message);
        });
    }
  };

  const ChatItem = ({isOther, text, date, avatar}) => {
    if (isOther) {
      return (
        <View style={styles.containerChatUser1}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.chatPhoto}
          />
          <View style={styles.contentChatUser1}>
            <Text style={styles.chatUser1}>{text}</Text>
            <Text style={styles.timeChatUser1}>{date}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.containerChatUser2}>
          <View style={styles.contentChatUser2}>
            <Text style={styles.chatUser2}>{text}</Text>
            <Text style={styles.timeChatUser2}>{date}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <Header
        type={'chatRoom'}
        name={dataUser.fullName}
        bio={dataUser.bio}
        image={dataUser.avatar}
        onPress={() => navigation.goBack()}
      />
      <ImageBackground source={DarkDoodle} style={styles.backgroundChat}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isOther = itemChat.data.sendBy === user.uid;
                  return (
                    <View style={styles.content}>
                      <View style={styles.chatContent}>
                        <ChatItem
                          key={itemChat.id}
                          isOther={!isOther}
                          text={itemChat.data.chatContent}
                          date={itemChat.data.chatTime}
                          avatar={isOther ? null : dataUser.avatar}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        <Gap height={ms(8)} />
        <View style={styles.sendContent}>
          <TextInput
            style={styles.textInput}
            placeholder="Type Here"
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            value={chatContent}
            onChangeText={value => {
              setChatContent(value);
            }}
          />
          <TouchableOpacity style={styles.button} onPress={chatSend}>
            <Feather name="send" size={ms(24)} color={colors.button.text} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  backgroundChat: {
    paddingTop: ms(24),
    paddingHorizontal: ms(24),
    paddingBottom: ms(110),
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('90%'),
  },
  content: {
    flex: 1,
    // backgroundColor: colors.icon.success,
  },
  chatContent: {
    flex: 1,
    // backgroundColor: colors.icon.danger,
  },
  containerChatUser1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor: colors.white,
    marginBottom: ms(16),
  },
  chatPhoto: {
    width: ms(20),
    height: ms(20),
    borderRadius: ms(20 / 2),
    resizeMode: 'contain',
    marginEnd: ms(8),
  },
  contentChatUser1: {
    maxHeight: heightPercentageToDP('100%'),
    maxWidth: widthPercentageToDP('65%'),
    backgroundColor: colors.background.secondary,
    borderTopRightRadius: ms(16),
    borderTopLeftRadius: ms(16),
    borderBottomRightRadius: ms(16),
    padding: ms(8),
  },
  chatUser1: {
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    fontSize: ms(14),
  },
  timeChatUser1: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(10),
  },
  containerChatUser2: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // backgroundColor: colors.icon.success,
    marginBottom: ms(16),
  },
  contentChatUser2: {
    maxHeight: heightPercentageToDP('100%'),
    maxWidth: widthPercentageToDP('65%'),
    backgroundColor: colors.button.background,
    borderTopRightRadius: ms(16),
    borderTopLeftRadius: ms(16),
    borderBottomLeftRadius: ms(16),
    padding: ms(8),
    alignItems: 'flex-end',
  },
  chatUser2: {
    fontFamily: fonts.primary[400],
    color: colors.black,
    fontSize: ms(14),
  },
  timeChatUser2: {
    fontFamily: fonts.primary[400],
    color: colors.background.secondary,
    fontSize: ms(10),
  },
  sendContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginEnd: ms(16),
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
  button: {
    padding: ms(9),
    borderRadius: ms(8),
    backgroundColor: colors.button.background,
    shadowColor: colors.button.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
