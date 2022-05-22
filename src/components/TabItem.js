import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {ms} from 'react-native-size-matters';

import {fonts, colors} from '../utils';

const TabItem = ({isFocused, onPress, label}) => {
  const Icon = () => {
    if (label === 'Contacts') {
      return isFocused ? (
        <FontAwesome5
          name="user-friends"
          size={ms(24)}
          color={colors.text.menuActive}
        />
      ) : (
        <FontAwesome5
          name="user-friends"
          size={ms(24)}
          color={colors.text.menuInactive}
        />
      );
    } else if (label === 'Chats') {
      return isFocused ? (
        <Entypo name="chat" size={ms(24)} color={colors.text.menuActive} />
      ) : (
        <Entypo
          name="chat"
          size={ms(24)}
          color={colors.text.menuInactive}
        />
      );
    } else if (label === 'Profile') {
      return isFocused ? (
        <FontAwesome
          name="user"
          size={ms(24)}
          color={colors.text.menuActive}
        />
      ) : (
        <FontAwesome
          name="user"
          size={ms(24)}
          color={colors.text.menuInactive}
        />
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon />
      <Text style={styles.label(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: ms(43),
    paddingVertical: ms(10),
  },
  label: isFocused => ({
    marginTop: 4,
    fontFamily: isFocused ? fonts.primary[600] : fonts.primary.normal,
    fontSize: 12,
    color: isFocused ? colors.text.menuActive : colors.text.menuInactive,
  }),
});
