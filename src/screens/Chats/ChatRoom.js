import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {Header} from '../../components';
import {colors, fonts} from '../../utils';
import DarkDoodle from '../../assets/dark-doodle.jpg';

const ChatRoom = () => {
  const [inputChat, setinputChat] = useState('');

  return (
    <SafeAreaView>
      <Header type={'chatRoom'} />
      <ImageBackground source={DarkDoodle} style={styles.backgroundChat}>
        <View style={styles.content}>
          <View style={styles.chatContent}>
            <View style={styles.containerChatUser1}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
                }}
                style={styles.chatPhoto}
              />
              <View style={styles.contentChatUser1}>
                <Text style={styles.chatUser1}>
                  Test user 1Test user 1Test user 1Test user 1Test user 1 Test
                  user 1 Test user 1 Test user 1 Test user 1
                </Text>
                <Text style={styles.timeChatUser1}>23.59</Text>
              </View>
            </View>
            <View style={styles.containerChatUser2}>
              <View style={styles.contentChatUser2}>
                <Text style={styles.chatUser2}>
                  Test User 2 Test User 2Test User 2 Test User 2 Test User 2 Test User 2
                </Text>
                <Text style={styles.timeChatUser2}>00.00</Text>
              </View>
            </View>
          </View>

          <View style={styles.sendContent}>
            <TextInput
              style={styles.textInput}
              placeholder="Type Here"
              placeholderTextColor={colors.text.secondary}
              selectionColor={colors.text.primary}
              onChangeText={text => {
                setinputChat(text);
              }}
            />
            <TouchableOpacity style={styles.button}>
              <Feather name="send" size={ms(24)} color={colors.button.text} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Header type={'chatRoom'} />
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
    height: heightPercentageToDP('100%'),
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
