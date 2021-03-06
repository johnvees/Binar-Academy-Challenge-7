import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {colors, fonts} from '../../utils';

const Header = ({title, type, onPress, name, bio, image}) => {
  if (type === 'chat') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="message-plus-outline"
              size={ms(24)}
              color={colors.white}
              style={{marginRight: ms(16)}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              name="notifications-none"
              size={ms(24)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (type === 'chatRoom') {
    return (
      <SafeAreaView style={styles.content}>
        <TouchableOpacity onPress={onPress}>
          <Feather name="chevron-left" size={ms(24)} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: image,
            }}
            style={styles.profilePhoto}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatContent}>
          <View>
            <Text
              style={styles.username}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {name}
            </Text>
            <Text
              style={styles.lastChat}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {bio}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <Text style={{color: colors.text.primary}}>Coming Soon</Text> */}
      </SafeAreaView>
    );
  } else if (type === 'contact') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </SafeAreaView>
    );
  } else if (type === 'finalRegist') {
    return (
      <SafeAreaView style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onPress}>
          <Feather name="chevron-left" size={ms(24)} color={colors.white} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            // backgroundColor: colors.icon.danger,
            alignItems: 'center',
            marginStart: ms(-24),
          }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: colors.icon.danger,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[500],
    fontSize: ms(24),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(16),
    backgroundColor: colors.background.primary,
  },
  profilePhoto: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(10),
    resizeMode: 'contain',
    marginHorizontal: ms(16),
  },
  chatContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.icon.danger,
  },
  username: {
    fontFamily: fonts.primary[500],
    color: colors.text.primary,
    fontSize: ms(16),
  },
  lastChat: {
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    fontSize: ms(10),
  },
});
